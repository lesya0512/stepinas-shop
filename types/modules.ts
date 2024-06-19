import { ITovar } from "./common";

export interface ITovarListItemProps {
    item: ITovar
}

export interface ITovarLabelProps {
    isNew: boolean
}

export interface IBreadcrumbsProps {
    getTextGenerator: (arg0: string, query: string[]) => void
    getDefaultTextGenerator: (arg0: string, href: string) => string
}

export interface ICrumbProps {
    text: string
    textGenerator: () => string
    href: string
    last: boolean
}

export interface IOrderInfoBlockProps {
    isCorrectPromotionalCode?: boolean
    isOrderPage?: boolean
}

export interface IEmptyPageContentProps {
    subtitle: string
    description: string
    btnText: string
    bgClassName: string
    emptyWord?: string
    bgWordClassName?: string
    oopsWord?: string
    title?: string
}

export interface IContentTitleProp {
    title: string
    oopsWord: string
}