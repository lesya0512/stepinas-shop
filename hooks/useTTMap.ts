import { $mapInstance } from "@/context/order/state"
import { useUnit } from "effector-react"

export const useTTMap = () => {
  const mapInstance = useUnit($mapInstance)

  const handleSelectAddress = async (
    {
      lon1,
      lat1,
      lon2,
      lat2,
    }: {
      lon1: number
      lat1: number
      lon2: number
      lat2: number
    },
    position: {
      lat: number
      lon: number
    }, initialMapInstance?: any
  ) => {
    const ttMaps = await import(`@tomtom-international/web-sdk-maps`)
    const currentMap = initialMapInstance || mapInstance

    const sw = new ttMaps.LngLat(lon1, lat1);
    const ne = new ttMaps.LngLat(lon2, lat2);
    const bounds = new ttMaps.LngLatBounds(sw, ne);

    currentMap.fitBounds(bounds, { padding: 130, linear: true });

    const element = document.createElement('div')
    element.classList.add('map-marker')

    new ttMaps.Marker({ element })
      .setLngLat([position.lon, position.lat])
      .addTo(currentMap);
  }

   return { handleSelectAddress }
}