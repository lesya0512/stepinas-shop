import { createEffect } from "effector"
import toast from "react-hot-toast"
import api from './apiInstance'
import { onAuthSuccess } from "@/lib/utils/auth"
import { ISignUpFx } from "@/types/auth-popup"
import { setIsAuth } from "@/context/auth"
import { handleJWTError } from "@/lib/utils/errors"


// export const oauthFx = createEffect(
//   async ({ name, password, email }: ISignUpFx) => {
//     try {
//       const { data } = await api.post('/api/users/oauth', {
//         name,
//         password,
//         email,
//       })

//       await api.post('/api/users/email', {
//         password,
//         email,
//       })

//       onAuthSuccess('Авторизация выполнена!', data)
//       return data.user
//     } catch (error) {
//       toast.error((error as Error).message)
//     }
//   }
// )

export const signUpFx = createEffect(
  async ({ name, password, email, isOAuth }: ISignUpFx) => {

    const { data } = await api.post('/api/users/signup', {
      name,
      password,
      email,
    })

    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Регистрация прошла успешно!', data)

    return data
  }
)
//
export const signInFx = createEffect(
  async ({ email, password, isOAuth }: ISignUpFx) => {

    const { data } = await api.post('/api/users/login', { email, password })
    // console.log('data', data);
    
    if (data.warningMessage) {
      toast.error(data.warningMessage)
      return
    }

    onAuthSuccess('Вход выполнен!', data)

    return data
  }
)

export const refreshTokenFx = createEffect(async ({ jwt }:  { jwt: string }) => {
  const { data } = await api.post('/api/users/refresh', { jwt })

  localStorage.setItem('auth', JSON.stringify(data))

  return data
})
