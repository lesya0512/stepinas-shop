import { useEffect } from 'react'

interface Translations {
  [key: string]: string
}

export const usePageTitle = (page: string, additionalText = '') => {
  const translations: Translations = {
    home: 'Главная',
    about: 'О нас',
    contact: 'Контакты',
    catalog: 'Каталог'
    // Добавьте другие страницы и их переводы по мере необходимости
  }

  useEffect(() => {
    document.title = `Stepinas | ${translations[page] || page}${
      additionalText ? ` - ${additionalText}` : ''
    }`
  }, [additionalText, page])
}
