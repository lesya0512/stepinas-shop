import { StoreWritable } from 'effector'

export interface ITovar {
    _id: string
    type: string
    price: number
    name: string
    description: string
    characteristics: { [ index: string ]: string }
    images: string[]
    vendorCode: string
    inStock: string
    isNew: boolean
    sizes: ISizes
}

export interface ISizes {
    42: boolean
    44: boolean
    46: boolean
    48: boolean
    oversize: boolean
}

export interface ISelectedSizes {
    sizes: ISizes
    type: string
    className?: string
}

export interface IBaseEffectProps {
    jwt: string
    id: string
    setSpinner: (arg0: boolean) => void
}

export type UseGoodsByAuth<T> = StoreWritable<T>