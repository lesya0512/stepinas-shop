import { $sizes, $sizesOption, setSizes, setSizesOptions, updateSizesOptionBySize } from "@/context/catalog"
import { getCheckedArrayParam, getSearchParamsUrl } from "@/lib/utils/common"
import { useUnit } from "effector-react"
import { useEffect } from "react"

export const useSizeFilter = (
  handleApplayFiltersWithSizes: (arg0: string[]) => void
) => {
  const sizesOption = useUnit($sizesOption)
  const sizes = useUnit($sizes)

  const applaySizes = (sizes: string[]) => {
    handleApplayFiltersWithSizes(sizes)
    setSizes(sizes)
  }

  const handleSelectSize = (id: number) => {
    const updatedOptions = sizesOption.map((item) => 
      item.id == id ? { ...item, checked: !item.checked } : item
    )

    setSizesOptions(updatedOptions)

    const currentOption = updatedOptions.find((item) => item.id === id)

    if (currentOption && currentOption.checked) {
      applaySizes([...sizes, currentOption.size])
      return
    }

    applaySizes(sizes.filter((size) => size !== currentOption?.size))
  }

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const sizesParam = urlParams.get('sizes')

    if (sizesParam) {
      const validSizes = getCheckedArrayParam(sizesParam)

      if (validSizes) {
        applaySizes(validSizes)
        validSizes.forEach((size) => updateSizesOptionBySize(size))
      }

      return
    }

    setSizes([])
    setSizesOptions(
      sizesOption.map((option) => ({ ...option, chacked: false }))
    )
  }, [])

  return {
    handleSelectSize,
    sizesOption,
    sizes
  }
}