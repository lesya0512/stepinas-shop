import { useUnit } from 'effector-react'
import { useState, useEffect } from 'react'
import { $user } from '@/context/user'

export const useUserAvatar = () => {
  const user = useUnit($user)
  const [src, setSrc] = useState('')

  useEffect(() => {
    if (user.image) {
      setSrc(user.image)
      return
    }

    const oauthAvatar = JSON.parse(
      localStorage.getItem(
        '@@earthoOnespajs@@::Qo5jBnGRTuMpdXXLc0ns::default::undefined'
      ) as string
    )

    if (!oauthAvatar) {
      return
    }

    setSrc(oauthAvatar.body.decodedToken.user.user.photoURL)
  }, [user.image])

  return { src, alt: user.name }
}