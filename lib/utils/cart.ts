import toast from "react-hot-toast"; 
import { ICartItem } from "@/types/cart";
import { ITovar } from "@/types/common";
import { handleShowSizeTable, idGenerator, isUserAuth } from "./common";
import { addTovarToCart, setCartFromLS, setShouldShowEmpty } from "@/context/cart";
import { defaultConfig } from "next/dist/server/config-shared";

export const addItemToCart = (
    cloth: ITovar,
    setSpinner: (arg0: boolean) => void,
    count: number,
    selectedSize = ''
) => {
    
    if (!isUserAuth()) {
        addCartItemToLS(cloth, selectedSize, count)
        return
    } 
    const auth = JSON.parse(localStorage.getItem('auth') as string)

    const clientId = addCartItemToLS(cloth, selectedSize, count, false) 
    addTovarToCart({
        jwt: auth.accessToken,
        setSpinner,
        tovarId: cloth._id,
        type: cloth.type,
        count,
        size: selectedSize,
        clientId,
    })
}

export const addCartItemToLS = (
    cloth: ITovar,
    selectedSize: string,
    count: number,
    withToast = true
) => {
    let cartFromLS: ICartItem[] = JSON.parse(
        localStorage.getItem('cart') as string
    )
    const clientId = idGenerator()

    if (!cartFromLS) {
        cartFromLS = []
    }   

    setShouldShowEmpty(false)

    const exisingItem = cartFromLS.find(
        (item) => item.tovarId === cloth._id && item.size === selectedSize
    )

    if (exisingItem) {
        const updatedCountWithSize = 
            exisingItem.count !== count ? count : +exisingItem.count + 1
        const updatedCart = cartFromLS.map((item) => 
            item.tovarId === exisingItem.tovarId && item.size === selectedSize
                ? { 
                    ...exisingItem, 
                    count: selectedSize.length
                        ? updatedCountWithSize
                        : +exisingItem.count + 1,
                }
                : item    
        )

        localStorage.setItem('cart', JSON.stringify(updatedCart))
        setCartFromLS(updatedCart)
        toast.success('Добавлено в корзину!')
        return exisingItem.clientId
    }

    const cart = [
        ...cartFromLS, 
        {
            clientId,
            tovarId: cloth._id,
            size: selectedSize,
            count,
            image: cloth.images[0],
            name: cloth.name,
            price: cloth.price,
            inStock: cloth.inStock,
            type: cloth.type,
            color: cloth.characteristics.color,
        },
    ]
    localStorage.setItem('cart', JSON.stringify(cart))
    setCartFromLS(cart as ICartItem[])
    withToast && toast.success('Добавлено в корзину!')

    return clientId
}

export const addTovarToCartBySizeTable = (
    cloth: ITovar,
    setSpinner: (arg0: boolean) =>void,
    count: number,
    selectedSize = ''
) => {
    
    if (selectedSize) {

    // console.log('work');
        addItemToCart(cloth, setSpinner, count, selectedSize)
        return
    }
    
    handleShowSizeTable(cloth)
}

export const updateCartItemCountInLS = (cartItemId: string, count: number) => {
    let cart: ICartItem[] = JSON.parse(localStorage.getItem('cart') as string)
  
    if (!cart) {
      cart = []
    }
  
    const updatedCart = cart.map((item) =>
      item.clientId === cartItemId ? { ...item, count } : item
    )
  
    localStorage.setItem('cart', JSON.stringify(updatedCart))
    setCartFromLS(updatedCart as ICartItem[])
}

export const countWholeCartItemsAmount = (cart: ICartItem[]) => 
    cart.reduce((defaultConfig, item) => defaultConfig + +item.count, 0)



