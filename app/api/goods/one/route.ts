import clientPromise from "@/lib/mongodb";
import { getDbAndReqBody } from "@/lib/utils/api-routes";
import { ObjectId } from "mongodb";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
    try {
        const { db, reqBody } = await getDbAndReqBody(clientPromise, req)
        const isValidId = ObjectId.isValid(reqBody.tovarId)

        if (!isValidId) {
            return NextResponse.json({
                message: 'неверное id товара',
                status: 404,
            })
        }

        const tovarItem = await db
            .collection(reqBody.name)
            .findOne({ _id: new ObjectId(reqBody.tovarId) })

        return NextResponse.json({ status: 200, tovarItem })
    } catch (error) {
        throw new Error((error as Error).message)
    }
}