import { IBaseEffectProps } from "./common"

export interface ICartItem {
    _id: string
    clientId: string
    userId: string
    tovarId: string
    name: string
    image: string
    size: string
    color: string
    count: string | number
    price: string
    totalPrice: string
    inStock: string
    type: string
}

export interface IAddTovarToCartFx {
    tovarId: string
    type: string
    size: string
    count: number
    jwt: string
    clientId: string
    setSpinner: (arg0: boolean) => void
}

export interface IAddTovarsFromLSToCartFx {
    jwt: string
    cartItems: ICartItem[]
}

export interface IUpdateCartItemCountFx extends IBaseEffectProps {
    count: number
}

export interface IDeleteCartItemBtnProps {
    btnDisabled: boolean
    callBack: VoidFunction
    className?: string 
}

export type IDeleteCartItemsFx = IBaseEffectProps