import { ObjectId } from 'mongodb'
import { NextResponse } from 'next/server'
import { corsHeaders } from '@/constants/corsHeaders'
import clientPromise from '@/lib/mongodb'
import { getDbAndReqBody } from '@/lib/utils/api-routes'

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const id = url.searchParams.get('id')
    const type = url.searchParams.get('type')
    const isValidId = ObjectId.isValid(id as string)

    if (!isValidId) {
      return NextResponse.json(
        {
          message: 'Wrong product id',
          status: 404,
        },
        corsHeaders
      )
    }

    const tovarItem = await db
      .collection(type as string)
      .findOne({ _id: new ObjectId(id as string) })

    return NextResponse.json(
      {
        status: 200,
        tovarItem: {
          ...tovarItem,
          id: tovarItem?._id,
          images: tovarItem?.images.map((src: string) => ({
            url: src,
            desc: tovarItem.name,
          })),
        },
      },
      corsHeaders
    )
  } catch (error) {
    throw new Error((error as Error).message)
  }
}

export const dynamic = 'force-dynamic'