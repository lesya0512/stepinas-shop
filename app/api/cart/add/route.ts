import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";
import clientPromise from "@/lib/mongodb";
import { getAuthRouteData, parseJwt } from "@/lib/utils/api-routes";

export async function POST(req: Request) {
    try{
        const { db, validatedTokenResult, reqBody, token } = await getAuthRouteData(
            clientPromise,
            req
        )

        if (validatedTokenResult.status !== 200) {
            return NextResponse.json(validatedTokenResult)
        }

        if (Object.keys(reqBody).length < 5) {
            return NextResponse.json({
                message: 'not all fields passed',
                status: 404,
            })
        }

        const user = await db
            .collection('users')
            .findOne({ email: parseJwt(token as string).email })
        const tovarItem = await db
            .collection(reqBody.type)
            .findOne({ _id: new ObjectId(reqBody.tovarId) })

        if (!tovarItem) {
            return NextResponse.json({
                message: 'wrong tovar id',
                status: 404,
            })
        }

        const newCartItem = {
            userId: user?._id,
            tovarId: tovarItem._id,
            image: tovarItem.images[0],
            name: tovarItem.name,
            size: tovarItem.size,
            count: reqBody.count,
            color: tovarItem.color,
            price: tovarItem.price,
            totalPrice: tovarItem.price,
            inStock: tovarItem.inStock,
            clientId: tovarItem.clientId,
        }

        const { insertedId } = await db.collection('cart').insertOne(newCartItem)

        return NextResponse.json({
            status: 201,
            newCartItem: { _id: insertedId, ...newCartItem },
        })
    } catch (error) {
        throw new Error((error as Error).message)
    }
} 