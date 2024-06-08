import { useUnit } from "effector-react"
import { useMemo, useState } from "react"
import { $curretTovar } from "@/context/goods"
import { useCartByAuth } from "./useCartByAuth"
import { isItemInList, isUserAuth } from "@/lib/utils/common"
import { 
    addCartItemToLS, 
    addItemToCart, 
    addTovarToCartBySizeTable 
} from "@/lib/utils/cart"
import { $cart, $cartFromLs, updateCartItemCount } from "@/context/cart"

export const useCartAction = (isSizeTable = false) => {
    const cloth = useUnit($curretTovar)
    const [selectedSize, setSelectedSize] = useState('')
    const currentCartByAuth = useCartByAuth()
    const currentCartItems = currentCartByAuth.filter(
        (item) => item.tovarId === cloth._id
    )
    const cartItemBySize = currentCartItems.find(
        (item) => item.size === selectedSize
    )
    const existingItem = currentCartByAuth.find(
        (item) => item.tovarId === cloth._id && item.size === selectedSize
    )
    const [addToCartSpinner, setAddToCartSpinner] = useState(false)
    const [uprateCountSpinner, setUpdateCountSpinner] = useState(false)
    const [count, setCount] = useState(+(existingItem?.count as string) || 1)

    const handleAddToCart = (countFromCounter?: number) => {
        if (existingItem) {
                if (!isUserAuth()) {
                    addCartItemToLS(cloth, selectedSize, countFromCounter || 1)
                    return
                }
                    const auth = JSON.parse(localStorage.getItem('auth') as string)
                    const updatedCountWithSize =  !!countFromCounter
                        ? +existingItem.count !== countFromCounter
                            ? countFromCounter
                            : +existingItem.count + 1
                        : +existingItem + 1
                        
                updateCartItemCount({
                    jwt: auth.accessToken,
                    id: existingItem._id as string,
                    setSpinner: setUpdateCountSpinner,
                    count: selectedSize.length ? updatedCountWithSize : +existingItem.count + 1,
                })
                
                addCartItemToLS(cloth, selectedSize, count)
                return
            
        }

        if (isSizeTable) {
            addItemToCart(
                cloth,
                setAddToCartSpinner,
                countFromCounter || 1,
                selectedSize
            )
            return
        }

        addTovarToCartBySizeTable(
            cloth,
            setAddToCartSpinner,
            countFromCounter || 1,
            selectedSize
        )
    }

    const allCurrentCartItemCount = useMemo(
        () => currentCartItems.reduce((a, { count }) => a + +count, 0),
        [currentCartItems]
    )
    
    return { 
        cloth, 
        setSelectedSize, 
        setAddToCartSpinner,
        selectedSize, 
        addToCartSpinner, 
        currentCartItems,
        cartItemBySize, 
        setCount,
        count,
        existingItem,
        currentCartByAuth,
        handleAddToCart,
        uprateCountSpinner,
        allCurrentCartItemCount
    }
}