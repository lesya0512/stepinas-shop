interface Translations {
  [key: string]: string
}

export const useCrumbText = (initialText: string) => {
  const translations: Translations = {
    home: 'Главная',
    cart: 'Корзина'
  }

  const crumbText = translations[initialText] || initialText

  return { crumbText }
}
