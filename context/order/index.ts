'use client'
import { ICDEKAddressData, IGetCDEKOfficesByCityFx } from "@/types/order";
import { createDomain } from "effector";
import api from '@/api/apiInstance'
import toast from "react-hot-toast";

export const order = createDomain()
export const setDeliveryTab = order.createEvent<boolean>()
export const setPickupTab = order.createEvent<boolean>()
export const setMapInstance = order.createEvent<any>()
export const setShouldLoadCDEKData = order.createEvent<boolean>()
export const setChoosenPickupAddressData = 
  order.createEvent<Partial<ICDEKAddressData>>()

export const setChoosenDeliveryAddressData = 
  order.createEvent<Partial<ICDEKAddressData>>()

export const getCDEKOfficesByCity = 
  order.createEvent<IGetCDEKOfficesByCityFx>()

  export const getCDEKOfficesByCityFx = order.createEffect(
    async ({ city }: IGetCDEKOfficesByCityFx) => {
      try {
        const apiKey = process.env.NEXT_PUBLIC_GEOAPIFY_API_KEY
        if (!apiKey) {
          throw new Error('Geoapify API key is missing')
        }
  
        const baseUrl = `https://api.geoapify.com/v1/geocode/search?format=json&apiKey=${apiKey}`
        
        // Логирование запроса координат города
        console.log(`Fetching coordinates for city: ${city}`)
        
        const { data } = await api.get(`${baseUrl}&text=${city}`)
        
        if (!data.results || !data.results.length) {
          throw new Error('No results found for the specified city')
        }
  
        // Логирование координат города
        console.log(`City coordinates:`, data.results[0])
  
        const placeId = data.results[0].place_id
        if (!placeId) {
          throw new Error('Place ID is undefined')
        }
  
        const cdekBaseUrl = `https://api.geoapify.com/v1/geocode/search?format=json&apiKey=${apiKey}` // Убедитесь, что это правильный URL для поиска СДЭК
  
        // Использование place_id и фильтрация по названию
        const CDEKData = await api.get(
          `${cdekBaseUrl}&text=СДЭК&filter=place:${placeId}`
        )
  
        // Логирование ответа с пунктами выдачи CDEK
        console.log('CDEK pickup points:', CDEKData.data.results)
  
        return CDEKData.data.results
      } catch (error) {
        // Логирование ошибки
        console.error('Error fetching CDEK offices:', error)
  
        toast.error((error as Error).message)
        return []
      }
    }
  )