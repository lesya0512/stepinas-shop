import { closeQuickViewModal } from '@/context/modals';
import { formatPrice, removeOverflowHiddenFromBody } from '@/lib/utils/common';

import styles from '@/styles/quick-view-modal/index.module.scss'
import { ITovarListItemProps } from '@/types/modules';
import { useCartAction } from '@/hooks/useCartAction';
import QuickViewModalSlider from './QuickViewModalSlider';
import { useTovarImages } from '@/hooks/useTovarImages';
import TovarSizeItem from '../TovarListItem/TovarSizeItem';
import TovarCounter from '../TovarListItem/TovarCounter';
import AddToCartBtn from '../TovarListItem/AddToCartBtn';
import Link from 'next/link';
import TovarSizeTableBtn from '../TovarListItem/TovarSizeTableBtn';
import { ICartItem } from '@/types/cart';


const QuickViewModal = () => {
    const { 
        cloth, 
        selectedSize, 
        setSelectedSize, 
        cartItemBySize, 
        handleAddToCart,
        addToCartSpinner,
        uprateCountSpinner,
        currentCartItems,
        allCurrentCartItemCount,
        setCount, count,
        existingItem
    } = useCartAction()

    const images = useTovarImages(cloth)

    const handleCloseModal = () => {
        removeOverflowHiddenFromBody()
        closeQuickViewModal()
    }

    const addToCart = () => handleAddToCart(+(cartItemBySize?.count || 1))

    return (
        <div className={styles.modal}>
            <button className={`btn-reset ${styles.modal__close}`} onClick={handleCloseModal} />
            <div className={styles.modal__left}>
                <QuickViewModalSlider images={images} />
            </div>
            <div className={styles.modal__right}>

                <div className={styles.modal__right__title}>
                    <h3 className={styles.modal__right__title_name}>{cloth.name}</h3>
                    <div className={styles.modal__right__title_price}>
                        {formatPrice(+cloth.price)} рублей
                    </div>
                </div>

                {/* <div className={styles.modal__right__info}>
                    <TovarAvailable
                        vendorCode={cloth.vendorCode}
                        inStock={+cloth.inStock} 
                    />
                </div> */}

                <div className={styles.module__right__info}>
                    <div className={styles.modal__right__info__color}>
                        <b>Цвет:</b> {cloth.characteristics.color}
                    </div>


                    {Object.keys(cloth.sizes).length ? (
                        <div className={styles.modal__right__info__size}>
                            <div className={styles.modal__right__info__size__inner}>
                                {/* <span className={styles.tovar__size__title}>
                                    Размер
                                </span> */}
                                <TovarSizeTableBtn 
                                    sizes={cloth.sizes}
                                    type={cloth.type}
                                    className={styles.modal__right__info__sizes_btn}    
                                />
                            </div>
                            <ul className={`list-reset ${styles.modal__right__info__sizes}`}> 
                                {Object.entries(cloth.sizes).map(([key, value], i) => (
                                    <TovarSizeItem 
                                        key={i}
                                        currentSize={[key, value]}
                                        selectedSize={selectedSize}
                                        setSelectedSize={setSelectedSize}
                                        currentCartItems={currentCartItems}
                                    />
                                ))}
                            </ul>
                        </div>
                    ) : (
                        ''
                    )}

                    <div className={styles.modal__right__info__material}>
                        <b>Используемые материалы:</b> {cloth.characteristics.liningMaterials}
                    </div>

                    <div className={styles.modal__right__info__description}>
                        <b>Описание:</b> {cloth.description}
                    </div>

                    <div className={styles.modal__right__bottom}>
                        <span className={styles.tovar__count_title}>
                            <b>Количество:</b>
                        </span>


                        <div className={styles.modal__right__bottom__inner}>
                            {!!selectedSize ? (
                                <TovarCounter 
                                    className={`counter ${styles.modal__right__bottom__counter}`}
                                    count={count}
                                    totalCount={+cloth.inStock}
                                    initialCount={+(existingItem?.count || 1)}
                                    setCount={setCount}
                                    cartItem={existingItem as ICartItem}
                                    updateCountAsync={false}
                                />
                            ) : (
                                <div 
                                    className={`counter ${styles.modal__right__bottom__counter}`}
                                    style={{ justifyContent: 'center' }}
                                >
                                    <span>
                                        Товаров в корзине⠀
                                        {allCurrentCartItemCount}
                                    </span>
                                </div>
                            )}
                            <AddToCartBtn 
                                className={styles.modal__right__bottom__add}
                                text='Добавить в корзину'
                                handleAddToCart={addToCart}
                                addToCartSpinner={addToCartSpinner || uprateCountSpinner}
                                btnDisabled={
                                    addToCartSpinner ||
                                    uprateCountSpinner ||
                                    allCurrentCartItemCount === +cloth.inStock
                                }
                            />
                        </div>
                    </div>
                </div>

                <div className={styles.modal__right__more}>
                    <Link 
                        href={`/catalog/${cloth._id}`}
                        className={styles.modal__right__more__link}
                        onClick={handleCloseModal}
                    >
                        Больше информации о товаре
                    </Link>
                </div>

            </div>
            
        </div>
    );
};

export default QuickViewModal;
