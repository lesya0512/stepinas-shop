'use client'
import { loadOneTovarFx } from "@/api/goods";
import { getNewProductFx } from "@/api/main-page";
import { ITovar } from "@/types/common";
import api from '../api/apiInstance'
import { ILoadOneTovarFx, ILoadTovarsByFilterFx, ITovars } from "@/types/goods";
import { Effect, createDomain, createEffect, sample } from "effector";
import { Gate, createGate } from "effector-react";
import toast from "react-hot-toast";

export const loadTovarsByFilterFx = createEffect(
    async ({
        limit,
        offset,
        type,
        isCatalog,
        additionalParam
    }: ILoadTovarsByFilterFx) => {
        try {
            const { data } = await api.get(
                `/api/goods/filter?limit=${limit}&offset=${offset}&type=${type}&${additionalParam}${
                    isCatalog ? '&catalog=true' : ''
                }`
            )

            return data
        } catch (error) {
            toast.error((error as Error).message)
        }
    }
)

const goods = createDomain()

export const MainPageGate = createGate()

export const setCurrentTovar = goods.createEvent<ITovar>()
export const loadOneTovar = goods.createEvent<ILoadOneTovarFx>()
export const loadTovarsByFilter = goods.createEvent<ILoadTovarsByFilterFx>()

const goodsStoreInstance = (effect: Effect<void, [], Error>) => 
    goods 
        .createStore([])
        .on(effect.done, (_, { result }) => result)
        .on(effect.fail, (_, { error }) => {
        // console.log(error.message);
    })

const goodsSampleInstance = (
    effect: Effect<void, [], Error>,
    gate: Gate<unknown>
) => 
    sample({
        clock: gate.open,
        target: effect,
    })

export const $newProduct = goodsStoreInstance(getNewProductFx)

goodsSampleInstance(getNewProductFx, MainPageGate)

export const $curretTovar = goods 
    .createStore<ITovar>({} as ITovar)
    .on(setCurrentTovar, (_, cloth) => cloth)
    .on(loadOneTovarFx.done, (_, {result}) => result.tovarItem)

export const $tovars = goods
    .createStore<ITovars>({} as ITovars)
    .on(loadTovarsByFilterFx.done, (_, { result }) => result)

sample({
    clock: loadOneTovar,
    source: $curretTovar,
    fn: (_, data) => data,
    target: loadOneTovarFx,
});

sample({
    clock: loadTovarsByFilter,
    source: $tovars,
    fn: (_, data) => data,
    target: loadTovarsByFilterFx,
});