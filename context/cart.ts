import { createDomain, createEffect, sample } from "effector";
import toast from "react-hot-toast";
import { addTovarToCartFx, deleteCartItemFx, getCartItemsFx, updateCartItemCountFx } from "@/api/cart";
import { handleJWTError } from "@/lib/utils/errors";
import { 
    IAddTovarToCartFx, 
    IAddTovarsFromLSToCartFx, 
    ICartItem, 
    IDeleteCartItemsFx, 
    IUpdateCartItemCountFx
} from "@/types/cart";
import api from '../api/apiInstance'

const cart = createDomain()

export const loadCartItems = cart.createEvent<{ jwt: string }>()
export const setCartFromLS = cart.createEvent<ICartItem[]>()
export const addTovarToCart = cart.createEvent<IAddTovarToCartFx>()
export const addTovarsFromLSToCart = 
    cart.createEvent<IAddTovarsFromLSToCartFx>()
export const updateCartItemCount = cart.createEvent<IUpdateCartItemCountFx>()
export const setTotalPrice = cart.createEvent<number>()
export const deleteTovarFromCart = cart.createEvent<IDeleteCartItemsFx>()
export const setShouldShowEmpty = cart.createEvent<boolean>()

export const addTovarsFromLSToCartFx = createEffect(
    async ({ jwt, cartItems }: IAddTovarsFromLSToCartFx) => { 
        try {
            const { data } = await api.post(
                '/api/cart/add-many',
                { items: cartItems },
                {
                    headers: { Authorization: `Bearer ${jwt}` },
                }
            )

            if (data?.error) {
                const newData: { cartItems: ICartItem[] } = await handleJWTError(
                    data.error.name,
                    {
                        repeatRequestMethodName: 'addTovarsFromLSToCartFx',
                        payload: { items: cartItems }
                    }
                )
                return newData
            }

            loadCartItems({ jwt });
            return data
        } catch (error) {
            toast.error((error as Error).message)
        }
    }
)

export const $cart = cart
    .createStore<ICartItem[]>([])
    .on(getCartItemsFx.done, (_, { result }) => result)
    .on(addTovarsFromLSToCartFx.done, (_, { result }) => result.items)
    .on(addTovarToCartFx.done, (cart, { result }) => [
        ...new Map(
            [...cart, result.newCartItem].map((item) => [item.clientId, item])
          ).values(),
    ])
    .on(updateCartItemCountFx.done, (cart, { result }) => 
        cart.map((item) => 
            item._id === result.id? { ...item, count: result.count } : item     
        )
    )
    .on(deleteCartItemFx.done, (cart, { result }) => 
        cart.filter((item) => item._id !== result.id)
    )

export const $cartFromLs = cart
    .createStore<ICartItem[]>([])
    .on(setCartFromLS, (_, cart) => cart)

export const $totalPrice = cart 
    .createStore<number>(0)
    .on(setTotalPrice, (_, value) => value)

export const $shouldShowEmpty = cart 
    .createStore(false)
    .on(setShouldShowEmpty, (_, value) => value)


sample({
    clock: loadCartItems,
    source: $cart,
    fn: (_, data) => data,
    target: getCartItemsFx
});


sample({
    clock: addTovarToCart,
    source: $cart,
    fn: (_, data) => data,
    target: addTovarToCartFx
});

sample({
    clock: addTovarsFromLSToCart,
    source: $cart,
    fn: (_, data) => data,
    target: addTovarsFromLSToCartFx
});

sample({
    clock: updateCartItemCount,
    source: $cart,
    fn: (_, data) => data,
    target: updateCartItemCountFx
});

sample({
    clock: deleteTovarFromCart,
    source: $cart,
    fn: (_, data) => data,
    target: deleteCartItemFx
});