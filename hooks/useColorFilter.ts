import { $colors, $colorsOption, setColors, setColorsOptions, updateColorsOptionByCode } from "@/context/catalog"
import { getCheckedArrayParam, getSearchParamsUrl } from "@/lib/utils/common"
import { useUnit } from "effector-react"
import { useEffect } from "react"

export const useColorFilter = ( 
  handleApplayFiltersWithColors: (arg0: string[]) => void
) => {
  const colorsOption = useUnit($colorsOption)
  const colors = useUnit($colors)

  const handleSelectColor = (id: number) => {
    const updatedOptions = colorsOption.map((item) => 
      item.id == id ? { ...item, checked: !item.checked } : item
    )

    setColorsOptions(updatedOptions)

    const currentOption = updatedOptions.find((item) => item.id === id)

    if (currentOption && currentOption.checked) {
      setColors([...colors, currentOption.colorText])
      handleApplayFiltersWithColors(
        updatedOptions
          .filter((option) => option.checked)
          .map((option) => option.colorCode) 
      )
      return
    }

    const updatedColorByText = colors.filter(
      (color) => color !== currentOption?.colorText
    )

    const updatedColorByCode = updatedColorByText.map(
      (color) => 
        colorsOption.find((option) => option.colorText === color)?.colorCode
    )

    setColors(updatedColorByText)
    handleApplayFiltersWithColors(updatedColorByCode as string[])
  }

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const colorsParam = urlParams.get('colors')
    const updatedColorOptions = colorsOption.map((option) => ({
      ...option,
      optionText: option.colorCode
    }))

    setColorsOptions(updatedColorOptions)
    setColors(updatedColorOptions
      .filter((option) => option.checked)
      .map((option) => option.colorText)
    )

    if (colorsParam) {
       const validColors = getCheckedArrayParam(colorsParam)

      if (validColors) {
        setColors(validColors); // Передаем массив строк напрямую
        handleApplayFiltersWithColors(validColors);
        validColors.forEach((color) => updateColorsOptionByCode(color));
      }
    }

    setColors([])
    setColorsOptions(
      colorsOption.map((option) => ({ ...option, chacked: false }))
    )
  }, [])

  return {
    handleSelectColor,
    colors,
    colorsOption
  }
}