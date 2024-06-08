'use client'
import { getCartItemsFx } from '@/api/cart';
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount';
import Breadcrumbs from '@/components/modules/Breadcrumbs/Breadcrumds';
import CartList from '@/components/modules/CartPage/CartList';
import PromotionalCode from '@/components/modules/CartPage/PromotionalCode';
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent';
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock';
import { basePropsForMotion } from '@/constants/motion';
import { $shouldShowEmpty } from '@/context/cart';
import { useBreadcrumbs } from '@/hooks/useBreadcrumbs';
import { useCartByAuth } from '@/hooks/useCartByAuth';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { countWholeCartItemsAmount } from '@/lib/utils/cart';
import styles from '@/styles/cart-page/index.module.scss'
import cartSkeletonStyles from '@/styles/cart-skeleton/index.module.scss'
import { useUnit } from 'effector-react';
import { motion } from 'framer-motion';
import { Suspense, useState } from 'react';

const CartPage = () => {
    const cartSpinner = useUnit(getCartItemsFx.pending)
    const currentCartByAuth = useCartByAuth()
    const { getDefaultTextGenerator, getTextGenerator } = useBreadcrumbs('cart')
    const isMedia930 = useMediaQuery(930)
    const [isCorrectPromotionalCode, setIsCorrectPromotionalCode] = useState(false)
    const shouldShowEmpty = useUnit($shouldShowEmpty)

    return (
        <main>
            <Suspense fallback={<div>Loading...</div>}>
                <Breadcrumbs 
                    getDefaultTextGenerator={getDefaultTextGenerator}
                    getTextGenerator={getTextGenerator}
                />
            </Suspense>

            {!shouldShowEmpty ? (
                <section className={styles.cart}>
                    <div className="container">
                        <HeadingWithCount 
                            count={countWholeCartItemsAmount(currentCartByAuth)}
                            title='Корзина'
                            spinner={cartSpinner}
                        />

                        <div className={styles.cart__inner}>
                            <div className={styles.cart__left}>
                                {cartSpinner && (
                                    <motion.ul 
                                        {...basePropsForMotion}
                                        className={cartSkeletonStyles.skeleton}
                                    >
                                        {Array.from(new Array(3)).map((_, i) => (
                                            <li key={i} className={cartSkeletonStyles.skeleton__item}>
                                                <div 
                                                    className={cartSkeletonStyles.skeleton__item__light}
                                                />
                                            </li>
                                        ))}
                                    </motion.ul>
                                )}
                                {!cartSpinner && (
                                    <motion.ul
                                    {...basePropsForMotion}
                                    className={`list-reset ${styles.cart__list}`}
                                    >
                                    <CartList />
                                    </motion.ul>
                                )}
                            </div>
                            <div className={styles.cart__right}>
                                {isMedia930 && (
                                    <PromotionalCode 
                                        setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
                                    />
                                )}
                                <div className={styles.cart__right__order}>
                                    <OrderInfoBlock isCorrectPromotionalCode={isCorrectPromotionalCode}/>
                                </div>
                            </div>
                        </div>
                        {!isMedia930 && (
                            <PromotionalCode 
                                setIsCorrectPromotionalCode={setIsCorrectPromotionalCode}
                            />
                        )}
                    </div>
                </section>
            ) : (
                <section>
                    <div className='container'>
                        <EmptyPageContent 
                            subtitle='Ваша корзина пуста'
                            description='Чтобы совершить покупку перейдите в каталог и положите в корзину выбранные вещи'
                            btnText='Перейти к покупкам'
                            bgClassName={styles.empty_bg}
                        />
                    </div>
                </section>
            )}

        </main>
    );
};

export default CartPage;