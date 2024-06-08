import { ITovarListItemProps } from '@/types/modules';
import styles from '@/styles/tovar-list-item/index.module.scss'
import Link from 'next/link';
import Image from "next/image"
import TovarLabel from './TovarLabel';
import TovarItemActionBtn from '@/components/elements/TovarItemActionBtn/TovarItemActionBtn';
import TovarAvailable from '@/components/elements/TovarAvailable/TovarAvailable';
import { addOverflowHiddenToBody, formatPrice, isItemInList } from '@/lib/utils/common';
import { setCurrentTovar } from '@/context/goods';
import { showQuickViewModal } from '@/context/modals';
import { useCartAction } from '@/hooks/useCartAction';
import { addTovarToCartBySizeTable } from '@/lib/utils/cart';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';

const TovarListItem = ({ item }: ITovarListItemProps) => {

    const { addToCartSpinner, setAddToCartSpinner, currentCartByAuth } = 
        useCartAction()
    const isTovarInCart = isItemInList(currentCartByAuth, item._id)
    
    const handleShowQuickViewModal = () => {
        addOverflowHiddenToBody()
        showQuickViewModal()
        setCurrentTovar(item)
    }

    const addToCart = () => addTovarToCartBySizeTable(item, setAddToCartSpinner, 1)
    
    return (
        <li className={styles.list_item}>

                  <div className={styles.list_overlay}>
                    <TovarLabel isNew={item.isNew}/> 

                    <div className={styles.list_item_action}>
                        <TovarItemActionBtn 
                            text="в избранное"
                            iconClass="action__btn_favorite" 
                        />
                        <TovarItemActionBtn 
                            text="быстрый просмотр"
                            iconClass="action__btn_quickview" 
                            callBack={handleShowQuickViewModal}
                        />
                    </div>
                  </div>

                    <Link href={`/catalog/${item._id}`}>
                        <div className={styles.list_item__img}>
                            <Image src={item.images[0]} alt={item.name} width={300} height={400}/>
                        </div>
                    </Link>


                <div className={styles.list_item__inner}>
                    <h3 className={styles.list_item__title}>
                        <Link href={`/catalog/${item._id}`}>
                            {item.name}
                        </Link>
                    </h3>
                    <TovarAvailable 
                        inStock={+item.inStock}
                        vendorCode={item.vendorCode}
                    />
                    <span className={styles.list_item__price}>
                        {formatPrice(+item.price)} рублей
                    </span>
                </div>
            
            
                {Object.keys(item.sizes).length > 0 ? (
                    <button
                        className={`btn-reset ${styles.list_item__cart}`}
                        onClick={addToCart}
                    >
                        Добавить в корзину
                    </button>
                    ) : (
                    <button
                        onClick={addToCart}
                        className={`btn-reset ${styles.list_item__cart} ${
                            isTovarInCart ? styles.list_item__cart_added : ''
                        }`}
                        disabled={addToCartSpinner}
                        style={addToCartSpinner ? { minWidth: 125, height: 48 } : {}}
                    >
                        {addToCartSpinner ? (
                            <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
                        ) : isTovarInCart ? (
                            'добавлено'
                        ) : (
                            'добавить в корзину'
                        )}
                    </button>
                )}
            
        </li>
    );
};

export default TovarListItem;

