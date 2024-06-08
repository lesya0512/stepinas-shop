import { closeAuthPopup, openAuthPopup, setIsAuth } from "@/context/auth"
import { setShouldShowEmpty } from "@/context/cart"
import { setCurrentTovar } from "@/context/goods"
import { closeSizeTable, showQuickViewModal, showSizeTable } from "@/context/modals"
import { setSizeTableSizes } from "@/context/sizeTable"
import { loginCheck } from "@/context/user"
import { ICartItem } from "@/types/cart"
import { ITovar } from "@/types/common"
import { EventCallable } from "effector"
import toast from "react-hot-toast"

export const getWindowWidth = () => {
    const { innerWidth: windowWidth } = 
        typeof window !== 'undefined' ? window : { innerWidth: 0 }

    return { windowWidth }
}

//

export const removeOverflowHiddenFromBody = () => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.classList.remove('overflow-hidden')
}

export const addOverflowHiddenToBody = (paddingRight = '') => {
    const body = document.querySelector('body') as HTMLBodyElement
    body.classList.add('overflow-hidden')
    paddingRight && (body.style.paddingRight = paddingRight)
}

// функция перемешивает карточки при обновлении страницы

export const shuffle = <T>(array: T[]) => {
    let currentIndex = array.length,
        randomIndex

    while (currentIndex != 0) {
        randomIndex = Math.floor(Math.random() * currentIndex)
        currentIndex--
        ;[array[currentIndex], array[randomIndex]] = [
            array[randomIndex],
            array[currentIndex]
        ]
    }
}

// ФОРМАТ ВЫВОДА ЦЕНЫ

export const formatPrice = (x: number) =>
    x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ' ')


// генератор айди

export const idGenerator = () => {
    const S4 = () => 
        (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1)
    return (
        S4() + 
        S4() + 
        '-' + 
        S4() + 
        '-' + 
        S4() + 
        '-' + 
        S4() + 
        '-' + 
        S4() + 
        S4() + 
        S4()
    )
}

// регистрация и авторизация

export const handleOpenAuthPopup = () => {
    addOverflowHiddenToBody()
    openAuthPopup()
}

export const handleCloseAuthPopup = () => {
    removeOverflowHiddenFromBody()
    closeAuthPopup()
}

export const closeAuthPopupWhenSomeModalOpened = (
    showQuickViewModal: boolean
) => {
    if (showQuickViewModal) {
        closeAuthPopup()
        return
    }

    handleCloseAuthPopup()
}

///////////////

export const isUserAuth = () => {
    const auth = JSON.parse(localStorage.getItem('auth') as string)

    if (!auth?.accessToken) {
        setIsAuth(false)
        return false
    }

    return true
}

// ///////////////

export const triggerLoginCheck = () => {
    if (!isUserAuth()) {
        return
    }

    const auth = JSON.parse(localStorage.getItem('auth') as string)

    loginCheck({ jwt: auth.accessToken })
}

////обновление счетчика товаров////

export const isItemInList = (array: ICartItem[], tovarId: string) => 
    array.some((item) => item.tovarId === tovarId)

///////

export const handleShowSizeTable = (cloth: ITovar) => {
    setCurrentTovar(cloth)
    setSizeTableSizes({ sizes: cloth.sizes, type: cloth.type })
    addOverflowHiddenToBody()
    showSizeTable()
}

///////

export const closeSizeTableByCheck = (showQuickViewModal: boolean) => {
    if (!showQuickViewModal) {
        removeOverflowHiddenFromBody()
    }

    closeSizeTable()
}

////////

export const getCartItemCountBySize = (
    cartItems: ICartItem[],
    currentSize: string
) => 
    cartItems.find((item) => item.size === currentSize)
        ?.count || 0

//////////

export const deleteTovarFromLS = <T>(
    id: string,
    key: string,
    event: EventCallable<T>,
    message: string,
    withToast = true
  ) => {
    let items = JSON.parse(localStorage.getItem(key) as string)
  
    if (!items) {
      items = []
    }
  
    const updatedItems = items.filter(
      (item: { clientId: string }) => item.clientId !== id
    )
  
    localStorage.setItem(key, JSON.stringify(updatedItems))
    event(updatedItems)
    withToast && toast.success(message) 

    if (!updatedItems.length) {
        setShouldShowEmpty(true)
    }
}

///////////////

export const showCountMessage = (count: string) => {
    if (count == '11' || count == '12' || count == '13' || count == '14') {
        return 'товаров'
    }

    if (count.endsWith('1')) {
        return 'товар'
    }

    if (count.endsWith('2') || count.endsWith('3') || count.endsWith('4')) {
        return 'товара'
    }

    return 'товаров'
}