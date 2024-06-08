import { Db, MongoClient, ObjectId } from 'mongodb'
import { shuffle } from './common'
import jwt, { VerifyErrors } from 'jsonwebtoken'
import bcrypt from 'bcryptjs'
import clientPromise from '../mongodb'
import { NextResponse } from 'next/server'

export const getDbAndReqBody = async (
    clientPromise: Promise <MongoClient>,
    req: Request | null
) => {
const db = (await clientPromise).db(process.env.NEXT_PUBLIC_DB_NAME)

if (req) {
    const reqBody = await req.json()
    return { db, reqBody }
}

return { db }
}

// НОВИНКИ

export const getNewGoods = async (db: Db, fieldName: string) => {
    const cloth = await db.collection('cloth').find().toArray()
  
    const filteredCloth = cloth.filter(item => {
      // Проверка наличия значения в указанном поле fieldName
      if (!item[fieldName]) return false;
      // Проверка наличия хотя бы одного размера товара
      if (Object.values(item.sizes).some(value => value)) return true;
      // Проверка отсутствия размеров товара (для аксессуаров)
      return !Object.values(item.sizes).length;
    });
  
    // Выбор первых двух элементов из отфильтрованного массива
    const slicedCloth = filteredCloth.slice(0, 4);
  
    // Перемешивание выбранных товаров
    shuffle(slicedCloth);
  
    return slicedCloth;
  }


// РЕГИСТРАЦИЯ И АВТОРИЗАЦИЯ 
// генерация токенов 

export const generateTokens = (name: string, email: string) => {
  const accessToken = jwt.sign(
    {
      name,
      email,
    },
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    {
      expiresIn: '10m',
    }
  )

  const refreshToken = jwt.sign(
    {
      email,
    },
    process.env.NEXT_PUBLIC_REFRESH_TOKEN_KEY as string,
    { expiresIn: '30d' }
  )

  return { accessToken, refreshToken }
}

//  регистрация и присвоение юзеру токена

export const createUserAndGenerateTokens = async (
  db: Db,
  reqBody: { name: string; password: string; email: string }
) => {
  const salt = bcrypt.genSaltSync(10)
  const hash = bcrypt.hashSync(reqBody.password, salt)

  await db.collection('users').insertOne({
    name: reqBody.name,
    password: hash,
    email: reqBody.email,
    image: '',
    role: 'user',
  })

  return generateTokens(reqBody.name, reqBody.email)
}

// нахождение юзера по адресу электронной почты

export const findUserByEmail = async (db: Db, email: string) =>
  db.collection('users').findOne({ email })

////////////////////////////////////

export const getAuthRouteData = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  withReqBody = true
) => {
  const { db, reqBody } = await getDbAndReqBody(
    clientPromise,
    withReqBody ? req : null
  )
  const token = req.headers.get('authorization')?.split(' ')[1]
  const validatedTokenResult = await isValidAccessToken(token)

  return { db, reqBody, validatedTokenResult, token }
}

////////////////////////////////////////

export const isValidAccessToken = async (token: string | undefined) => {
  const baseError = {
    message: 'Unauthorized',
    status: 401,
  }
  let jwtError = null

  if (!token) {
    return {
      ...baseError,
      error: { message: 'jwt is required' },
    }
  }

  await jwt.verify(
    token,
    process.env.NEXT_PUBLIC_ACCESS_TOKEN_KEY as string,
    async (err: VerifyErrors | null) => {
      if (err) {
        jwtError = err
      }
    }
  )

  if (jwtError) {
    return {
      ...baseError,
      error: jwtError,
    }
  }

  return { status: 200 }
}

///////////////////////////////////////

export const parseJwt = (token: string) =>
  JSON.parse(Buffer.from(token.split('.')[1], 'base64').toString())

// функция для получения товаров по опредленному айди 

export const getDataFromDBByCollection = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  collection: string
) => {
  const { db, validatedTokenResult, token } = await getAuthRouteData(
    clientPromise,
    req,
    false
  )

  if (validatedTokenResult.status !== 200) {
    return NextResponse.json(validatedTokenResult)
  }

  const user = await findUserByEmail(db, parseJwt(token as string).email)
  const items = await db
    .collection(collection)
    .find({ userId: user?._id })
    .toArray()

  return NextResponse.json(items)
}

///////

export const replaceTovarInCollection = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  collection: string
) => {
  const { db, validatedTokenResult, reqBody, token } = await getAuthRouteData(
    clientPromise,
    req
  )

  if (validatedTokenResult.status !== 200) {
    return NextResponse.json(validatedTokenResult)
  }

  if (!reqBody.items) {
    return NextResponse.json({
      message: 'items fields is required',
      status: 404,
    })
  }

  const user = await db
    .collection('users')
    .findOne({ email: parseJwt(token as string).email })

  const items = (reqBody.items as { tovarId: string }[]).map((item) => ({
    userId: user?._id,
    ...item,
    tovarId: new ObjectId(item.tovarId),
  }))

  await db.collection(collection).deleteMany({ userId: user?._id })

  if (!items.length) {
    return NextResponse.json({
      status: 201,
      items: [],
    })
  }

  await db.collection(collection).insertMany(items)

  return NextResponse.json({
    status: 201,
    items,
  })
}

export const deleteTovar = async (
  clientPromise: Promise<MongoClient>,
  req: Request,
  id: string,
  collection: string
) => {
  const { db, validatedTokenResult } = await getAuthRouteData(
    clientPromise,
    req,
    false
  )

  if (validatedTokenResult.status !== 200) {
    return NextResponse.json(validatedTokenResult)
  }

  await db.collection(collection).deleteOne({ _id: new ObjectId(id) })

  return NextResponse.json({ status: 204, id })
}

