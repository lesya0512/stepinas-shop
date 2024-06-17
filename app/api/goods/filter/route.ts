import clientPromise from "@/lib/mongodb";
import { getDbAndReqBody } from "@/lib/utils/api-routes";
import { checkPriceParam, getCheckedArrayParam } from "@/lib/utils/common";
import { Sort } from "mongodb";
import { NextResponse } from "next/server";

export async function GET(req: Request) {
  try {
    const { db } = await getDbAndReqBody(clientPromise, null)
    const url = new URL(req.url)
    const limit = url.searchParams.get('limit') || 8
    const offset = url.searchParams.get('offset') || 0
    const isCatalogParam = url.searchParams.get('catalog')
    const priceFromParam = url.searchParams.get('priceFrom')
    const priceToParam = url.searchParams.get('priceTo')
    const sizesParam = url.searchParams.get('sizes')
    const colorsParam = url.searchParams.get('colors')    
    const sortParam = url.searchParams.get('sort') || 'default'

    const isFullPriceRange = 
      priceFromParam &&
      priceToParam &&
      checkPriceParam(+priceFromParam) &&
      checkPriceParam(+priceToParam)
    const sizesArr = getCheckedArrayParam(sizesParam as string)
    const colorsArr = getCheckedArrayParam(colorsParam as string)

    const filter = {
      ...(isFullPriceRange && {
        price: { $gt: +priceFromParam, $lt: +priceToParam }
      }),
      ...(sizesArr && {
        $and: (sizesArr as string[]).map((sizes) => ({
          [`sizes.${sizes}`]: true,
        }))
      }),
      ...(colorsArr && {
        $or: (colorsArr as string[]).map((color) => ({
          ['characteristics.color']: color.toLowerCase(),
        }))
      })
    }   

    const sort = {
      ...(sortParam.includes('cheap') && {
        price: 1
      }),
      ...(sortParam.includes('expensive') && {
        price: -1
      }),
      ...(sortParam.includes('new') && {
        isNew: -1
      })
    }
  
    if (isCatalogParam) {
      const getFilteredCollection = async (collection: string) => {
        const goods = await db
          .collection(collection)
          .find(filter)
          .sort(sort as Sort)
          .toArray()

        return goods
      }

      const [cloth] = await Promise.allSettled([
        getFilteredCollection('cloth')
      ])

      if (cloth.status !== 'fulfilled') {
        return NextResponse.json(
          {
            count: 0,
            items: [],
          },
        )
      }

      const allGoods = [
        ...cloth.value
      ]

      return NextResponse.json({
        count: allGoods.length,
        items: allGoods.slice(+offset, +limit)
      })
    }

    return NextResponse.json({
      count: 0,
      items: [],
    })

  } catch (error) {
    throw new Error((error as Error).message)
  }
} 

export const dynamic = 'force-dynamic'