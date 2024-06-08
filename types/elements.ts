import { CustomArrowProps } from "react-slick"

export interface ITovarItemActionBtnProps {
    text: string
    iconClass: string
    callBack?: VoidFunction
    withTooltip?: boolean
}

export interface ITovarAvailableProps {
    inStock: number
    vendorCode: string
}

export interface IQuickViewModalSliderArrowProps extends CustomArrowProps {
    directionClassName: string
}

export interface IHeadingWithCountProps {
    count: number
    title: string
    spinner?: boolean
}