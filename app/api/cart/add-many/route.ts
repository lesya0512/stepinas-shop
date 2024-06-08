import clientPromise from '@/lib/mongodb'
import { replaceTovarInCollection } from '@/lib/utils/api-routes'

export async function POST(req: Request) {
  try {
    return replaceTovarInCollection(clientPromise, req, 'cart')
  } catch (error) {
    throw new Error((error as Error).message)
  }
}
