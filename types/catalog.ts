export type SearchParams = { [key: string]: string | string[] | undefined }

export interface ITovarsPage {
  searchParams: SearchParams
  pageName: string
}

export interface ICatalogFiltersProps {
  handleApplayFiltersWithPrice: (arg0: string, arg1: string) => void
  handleApplayFiltersWithSizes: (sizes: string[]) => void
  handleApplayFiltersWithColors: (sizes: string[]) => void
  handleApplayFiltersBySort: (arg0: string) => void
}

export interface ISizeOption {
  id: number
  size: string
  checked: boolean
}

export interface ICheckboxSelectItemProps {
  callback: (arg0: number) => void
  item: {
    id: number
    size?: string
    colorText?: string
    checked: boolean
  }
  mobileClassName?: string
}

export interface IColorOption {
  id: number
  colorCode: string
  checked: boolean
  colorText: string
}

export interface ICategoryOption {
  id: number
  title: string
  filterHandler: VoidFunction
}

export interface ISelectItemProps {
  item: ICategoryOption
  isActive: boolean
  setOption: (arg0: string) => void
  mobileClassName?: string
}

export interface ISelectInfoItem {
  text: string
  handleRemoveItem: (arg0: number) => void
  id: number
}