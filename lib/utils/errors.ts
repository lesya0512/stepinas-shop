import { refreshTokenFx } from "@/api/auth"
import { addTovarToCartFx, deleteCartItemFx, getCartItemsFx } from "@/api/cart"
import { JWTError } from "@/constants/jwt"
import { addTovarsFromLSToCartFx } from "@/context/cart"
import { loginCheckFx } from "@/context/user"
import { IAddTovarToCartFx, IAddTovarsFromLSToCartFx, IDeleteCartItemsFx } from "@/types/cart"

export const handleJWTError = async (
  errorName: string,
  repeatRequestAfterRefreshData?: {
    repeatRequestMethodName: string
    payload?: unknown
  }
) => {
    if (errorName === JWTError.EXPIRED_JWT_TOKEN) {
        const auth = JSON.parse(localStorage.getItem('auth') as string)
        const newTokens = await refreshTokenFx({ jwt: auth.refreshToken })


    if (repeatRequestAfterRefreshData) {
      const { repeatRequestMethodName, payload } = repeatRequestAfterRefreshData

      switch (repeatRequestMethodName) {
        case 'getCartItemsFx':
          return getCartItemsFx({
            jwt: newTokens.accessToken,
          })
//         case 'addProductToComparisonFx':
//           return addProductToComparisonFx({
//             ...(payload as IAddProductToComparisonFx),
//             jwt: newTokens.accessToken,
//           })
//         case 'getComparisonItemsFx':
//           return getComparisonItemsFx({
//             jwt: newTokens.accessToken,
//           })
//         case 'addProductsFromLSToComparisonFx':
//           return addProductsFromLSToComparisonFx({
//             ...(payload as IAddProductsFromLSToComparisonFx),
//             jwt: newTokens.accessToken,
//           })
//         case 'deleteComparisonItemFx':
//           return deleteComparisonItemFx({
//             ...(payload as IDeleteComparisonItemsFx),
//             jwt: newTokens.accessToken,
//           })
        case 'addTovarToCartFx':
          return addTovarToCartFx({
            ...(payload as IAddTovarToCartFx),
            jwt: newTokens.accessToken,
          })
          
        case 'addTovarsFromLSToCartFx':
          return addTovarsFromLSToCartFx({
            ...(payload as IAddTovarsFromLSToCartFx),
            jwt: newTokens.accessToken,
          })
        case 'deleteCartItemFx':
          return deleteCartItemFx({
            ...(payload as IDeleteCartItemsFx),
            jwt: newTokens.accessToken,
          })
//         case 'addProductToFavoriteFx':
//           return addProductToFavoriteFx({
//             ...(payload as Omit<IAddProductToCartFx, 'count'>),
//             jwt: newTokens.accessToken,
//           })
//         case 'getFavoriteItemsFx':
//           return getFavoriteItemsFx({
//             jwt: newTokens.accessToken,
//           })
//         case 'addProductsFromLSToFavoritesFx':
//           return addProductsFromLSToFavoritesFx({
//             ...(payload as IAddProductsFromLSToFavoriteFx),
//             jwt: newTokens.accessToken,
//           })
//         case 'deleteFavoriteItemFx':
//           return deleteFavoriteItemFx({
//             ...(payload as IDeleteFavoriteItemsFx),
//             jwt: newTokens.accessToken,
//           })
        case 'loginCheckFx':
          await loginCheckFx({
            jwt: newTokens.accessToken,
          })
          break
      }
    }
  }
}