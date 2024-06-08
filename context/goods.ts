'use client'

import { loadOneTovarFx } from "@/api/goods";
import { getNewProductFx } from "@/api/main-page";
import { ITovar } from "@/types/common";
import { ILoadOneTovarFx } from "@/types/goods";
import { Effect, createDomain, sample } from "effector";
import { Gate, createGate } from "effector-react";

const goods = createDomain()

export const MainPageGate = createGate()

export const setCurrentTovar = goods.createEvent<ITovar>()
export const loadOneTovar = goods.createEvent<ILoadOneTovarFx>()

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


sample({
    clock: loadOneTovar,
    to: loadOneTovarFx,
});