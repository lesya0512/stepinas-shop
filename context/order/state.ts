'use client'
import { ICDEKAddressData } from "@/types/order";
import { getCDEKOfficesByCityFx, order, setChoosenDeliveryAddressData, setChoosenPickupAddressData, setDeliveryTab, setMapInstance, setPickupTab, setShouldLoadCDEKData } from ".";

export const $cdekDataByCity = order
  .createStore<ICDEKAddressData[]>([])
  .on(getCDEKOfficesByCityFx.done, (_, { result }) => result)

export const $deliveryTab  = order
  .createStore<boolean>(false)
  .on(setDeliveryTab, (_, value) => value)

export const $pickupTab = order
  .createStore<boolean>(true)
  .on(setPickupTab, (_, value) => value)

export const $mapInstance = order
  .createStore<any>({})
  .on(setMapInstance, (_, value) => value)

export const $shouldLoadCDEKData = order
  .createStore(false)
  .on(setShouldLoadCDEKData, (_, value) => value)

export const $choosenPickupAddressData = order
  .createStore<Partial<ICDEKAddressData>>({})
  .on(setChoosenPickupAddressData, (_, value) => value)

export const $choosenDeliveryAddressData = order
  .createStore<Partial<ICDEKAddressData>>({})
  .on(setChoosenDeliveryAddressData, (_, value) => value)




