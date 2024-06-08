import { ICartItem } from "./cart"

export interface ILoadOneTovarFx {
    tovarId: string
    name: string
}

export interface ITovarSizesItemProps {
    currentSize: [string, boolean]
    selectedSize: string
    setSelectedSize: (arg0: string) => void
    currentCartItems: ICartItem[]
}

export interface ITovarCounterProps {
    className: string
    count: number
    setCount: (arg0: number) => void
    cartItem: ICartItem
    updateCountAsync: boolean
    initialCount?: number
    totalCount?: number 
    increasePrice?: VoidFunction
    decreasePrice?: VoidFunction 
}

export interface IAddToCartBtnProps {
    handleAddToCart: VoidFunction
    addToCartSpinner: boolean
    text: string
    btnDisabled?: boolean
    className: string
}

export interface ITovarCountBySizeProps {
    tovars: ICartItem[]
    size: string
    withCartIcon?: boolean
}