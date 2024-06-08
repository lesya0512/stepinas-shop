import clientPromise from "@/lib/mongodb";
import { deleteTovar } from "@/lib/utils/api-routes";

export async function DELETE(req: Request) {
    try {
        return deleteTovar(clientPromise, req, req.url.split('id=')[1], 'cart')
    } catch (error) {
        throw new Error((error as Error).message)
    }
}