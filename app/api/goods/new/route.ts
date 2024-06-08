import clientPromise from "@/lib/mongodb";
import { NextResponse } from "next/server";
import { 
    getDbAndReqBody, 
    getNewGoods 
} from "@/lib/utils/api-routes";

export async function GET() {
    const { db } = await getDbAndReqBody(clientPromise, null)

    return NextResponse.json(await getNewGoods(db, 'isNew'))
}

