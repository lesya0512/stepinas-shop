import { MutableRefObject, useEffect, useRef } from "react"

export const useDebounceCallback = (delay = 100) => {
    const timeRef = useRef() as MutableRefObject<NodeJS.Timeout>

    useEffect(() => clearTimeout(timeRef.current), [])

    return (callback: VoidFunction) => {
      clearTimeout(timeRef.current)
      timeRef.current = setTimeout(callback, delay)
    }
}