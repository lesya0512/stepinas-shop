import { createEffect } from "effector";
import toast from "react-hot-toast";
import api from './apiInstance'
import { ILoadOneTovarFx } from "@/types/goods";

export const loadOneTovarFx = createEffect (
    async ({ tovarId, name }: ILoadOneTovarFx) => {
        try {
            const { data } = await api.post('/api/goods/one', { tovarId, name })

            if (data?.message === 'неверное id товара') {
                return { tovarItem: { errorMessage: 'неверное id товара' } }
            }

            return data
        } catch (error) {
            toast.error((error as Error).message)
        }
    }
)