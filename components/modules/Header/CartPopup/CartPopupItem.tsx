import DeleteCartItemBtn from "@/components/elements/DeleteCartItemBtn/DeleteCartItemBtn";
import { useCartItemAction } from "@/hooks/useCartItemAction";
import { ICartItem } from "@/types/cart";
import Image from "next/image"
import Link from 'next/link';
import TovarCounter from "../../TovarListItem/TovarCounter";
import { formatPrice } from "@/lib/utils/common";

const CartPopupItem = ({ item }: { item: ICartItem }) => {
    const {
        deleteSpinner,
        increasePriceWithAnimation,
        decreasePriceWithAnimation,
        count,
        setCount,
        animatedPrice,
        handleDeleteCartItem
    } = useCartItemAction(item)

    return (
        <>
           <DeleteCartItemBtn btnDisabled={deleteSpinner} callBack={handleDeleteCartItem} /> 
            <div className="cart-list__item__img">
                <Image src={item.image} alt={item.name} width={92} height={92}/>
            </div>
            <div className="cart-list__item__inner">
                <Link 
                    href={`/catalog/${item.type}/${item.tovarId}`} 
                    className="cart-list__item__title"
                >
                    <span>
                        {item.name.replace('.', '')}
                        {item.size ? ', ' : ''}
                    </span>
                    <span>{item.size}</span>
                </Link>
                <div className="cart-list__item__price">
                    <TovarCounter 
                        className="cart-list__item__counter"
                        count={count}
                        setCount={setCount}
                        increasePrice={increasePriceWithAnimation}
                        decreasePrice={decreasePriceWithAnimation}
                        cartItem={item}
                        updateCountAsync
                    />
                    <span className="cart-list__item__price">
                        {formatPrice(animatedPrice)}
                    </span>
                </div>
            </div>
        </>
    );
};

export default CartPopupItem;