import { ICartItem } from "./cart"

export interface IOrderTitleProps {
  orderNumber: string
  text: string
}

export interface IOrderCartItemProps {
  item: ICartItem
  position: number
}

export interface IGetCDEKOfficesByCityFx {
  city: string
}

export interface ICDEKAddressData {
  address_line1: string
  address_line2: string
  city: string
  place_id: string
  bbox: IAddressBBox
  lat: number
  lon: number
}

export interface ITabControlsProps {
  handleTab1: VoidFunction
  handleTab2: VoidFunction
  tab1Active: boolean
  tab2Active: boolean
  tab1Text: string
  tab2Text: string
}

export interface IAddressPosition {
  lat: number
  lon: number
}

export interface IAddressBBox {
  lon1: number
  lat1: number
  lon2: number
  lat2: number
}

export interface IPickupAddressItemProps {
  addressItem: ICDEKAddressData
  handleSelectAddress: (arg0: IAddressBBox, arg1: IAddressPosition) => void
  handleChosenAddressData: (arg0: Partial<ICDEKAddressData>) => void
}