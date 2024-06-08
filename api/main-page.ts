import { createEffect } from "effector";
import api from './apiInstance'


export const getNewProductFx = createEffect(async () => {
    const { data } = await api.get('/api/goods/new')

    return data
})