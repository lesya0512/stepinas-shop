import { IColorOption, ISizeOption } from "@/types/catalog";
import { createDomain } from "effector";

const catalog = createDomain()

export const setSizesOptions = catalog.createEvent<ISizeOption[]>()
export const setColorsOptions = catalog.createEvent<IColorOption[]>()

export const updateSizesOptionBySize = catalog.createEvent<string>()
export const updateColorsOptionByCode = catalog.createEvent<string>()

export const setSizes = catalog.createEvent<string[]>()
export const setColors = catalog.createEvent<string[]>()
export const setFiltersPopup = catalog.createEvent<boolean>()

export const updateColorTexts = catalog.createEvent();

// Определяем объект для сопоставления цветовых кодов с текстовыми значениями
const colorMapping: { [index: string]: string } = {
  white: 'Белый',
  black: 'Черный',
  green: 'Зеленый',
  blue: 'Синий',
  // Добавьте остальные цвета
};

export const $sizesOption = catalog
  .createStore<ISizeOption[]>([
    { id: 1, size: '42', checked: false },
    { id: 2, size: '44', checked: false },
    { id: 3, size: '46', checked: false }, 
    { id: 4, size: '48', checked: false },
    { id: 5, size: 'oversize', checked: false },
  ])
  .on(setSizesOptions, (_, options) => options)
  .on(updateSizesOptionBySize, (state, size) => 
    state.map((item) => 
      item.size === size ? { ...item, checked: true } : item
    )  
  )

  export const $colorsOption = catalog
  .createStore<IColorOption[]>([
    { id: 1, colorCode: 'white', checked: false, colorText: colorMapping['white'] },
    { id: 2, colorCode: 'black', checked: false, colorText: colorMapping['black'] },
    { id: 3, colorCode: 'green', checked: false, colorText: colorMapping['green'] },
    { id: 4, colorCode: 'blue', checked: false, colorText: colorMapping['blue'] },
  ])
  .on(setColorsOptions, (_, options) => options)
  .on(updateColorsOptionByCode, (state, color) =>
    state.map((item) =>
      item.colorCode === color ? { ...item, checked: true } : item
    )
  )
  .on(updateColorTexts, (state) =>
    state.map((item) => ({
      ...item,
      colorText: colorMapping[item.colorCode] || 'Unknown Color',
    }))
  );

export const $sizes = catalog
  .createStore<string[]>([])
  .on(setSizes, (_, sizes) => sizes)
 
export const $colors = catalog
  .createStore<string[]>([])
  .on(setColors, (_, colors) => colors)

export const $filtersPopup = catalog
  .createStore(false)
  .on(setFiltersPopup, (_, value) => value)
