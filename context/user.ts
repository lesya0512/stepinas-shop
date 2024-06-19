import { createDomain, createEffect, sample } from "effector";
import { IUser, IUserGeolocation } from "@/types/user";
import { handleJWTError } from "@/lib/utils/errors";
import { setIsAuth } from "./auth";
import toast from "react-hot-toast";
import api from '../api/apiInstance'
import { IGetGeolocationFx } from "@/types/common";

export const loginCheckFx = createEffect(async ({ jwt }: { jwt: string }) => {
  try {
    const { data } = await api.get('/api/users/login-check', {
      headers: { Authorization: `Bearer ${jwt}` },
    })

    if (data?.error) {
      handleJWTError(data.error.name, {
        repeatRequestMethodName: 'loginCheckFx',
      })
      return
    }

    setIsAuth(true)
    return data.user
  } catch (error) {
    toast.error((error as Error).message)
  }
})

export const getGeolocationFx = createEffect(async ({ lat, lon }: IGetGeolocationFx) => {
  try {
    const data = await api.get(
      `https://api.geoapify.com/v1/geocode/reverse?lat=${lat}&lon=${lon}&apiKey=${process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY}`
    )

    return data
  } catch (error) {
    toast.error((error as Error).message)
  }
})

const  user = createDomain()
export const loginCheck = user.createEvent<{ jwt: string }>()
export const setUserGeolocation = user.createEvent<IUserGeolocation>()


export const $user = user
  .createStore<IUser>({} as IUser)
  .on(loginCheckFx.done, (_, { result }) => result)

export const $userGeolocation = user
  .createStore<IUserGeolocation>({} as IUserGeolocation)
  .on(setUserGeolocation, (_, data) => data)

sample({
    clock: loginCheck,
    source: $user,
    fn: (_, { jwt }) => ({
        jwt,
    }),
    target: loginCheckFx,
})