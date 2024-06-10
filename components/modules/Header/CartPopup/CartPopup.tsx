import { withClickOutside } from "@/components/hocs/withClickOutside";
import { IWrappedComponentProps } from "@/types/hocs";
import { forwardRef } from "react";
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link";
import { getCartItemsFx } from "@/api/cart";
import { useUnit } from "effector-react";
import { useCartByAuth } from "@/hooks/useCartByAuth";
import CartPopupItem from "./CartPopupItem";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { useTotalPrice } from "@/hooks/useTotalPrice";
import { formatPrice } from "@/lib/utils/common";
import { $cart, $cartFromLs } from "@/context/cart";

const CardPopup = forwardRef<HTMLDivElement, IWrappedComponentProps>(
    ({ open, setOpen }, ref) => {
        const handleShowPopup = () => setOpen(true)
        const spinner = useUnit(getCartItemsFx.pending)
        const currentCartByAuth = useCartByAuth();
        const { animatedPrice } = useTotalPrice()
        
        const handleHidePopup = () => setOpen(false)

        return (
            <div className="cart-popup" ref={ref}>
                <Link 
                    className='header-nav-item-btn header-nav-item-btn--shoppingbag'
                    href='/cart'
                    onMouseEnter={handleShowPopup}
                    passHref
                > 
                    {!!currentCartByAuth.length && <span className="not-empty"/>}
                </Link>
                <AnimatePresence>
                    {open && (
                        <motion.div initial={{ opacity: 0, scale: 0 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0 }} className='cart-popup__wrapper' onMouseLeave={handleHidePopup}>
                            <button className="btn-reset cart-popup-close"
                            onClick={handleHidePopup} />
                            <h3 className="cart-popup-title">Корзина</h3>

                            {spinner ? (
                                <div className="cart-popup__spinner">
                                    <FontAwesomeIcon 
                                        icon={faSpinner}
                                        spin
                                        color="#fff"
                                        size="3x"
                                    />
                                </div>
                            ) : (
                                <ul className="list-reset cart-popup-cartlist">
                                    <AnimatePresence>
                                        {currentCartByAuth.length ? (
                                            currentCartByAuth.map((item) => (
                                                <motion.li
                                                    key={item._id || item.clientId}
                                                    initial={{ opacity: 0 }}
                                                    animate={{ opacity: 1 }}
                                                    exit={{ opacity: 0 }}
                                                    className="cart-list__item"
                                                >
                                                    <CartPopupItem item={item} />
                                                </motion.li>
                                            ))
                                        ) : (
                                            <li className="cart-popup-cart-list-empty-cart"></li>    
                                        )}
                                    </AnimatePresence>
                                </ul>
                            )}

                            <div className="cart-popup-footer">
                                <div className="cart-popup-up">
                                    <span>Сумма заказа:</span> 
                                    <span>{formatPrice(animatedPrice)}</span>
                                </div>
                                <Link href='/order' className="cart-popup__footer__link">Оформить заказ</Link>
                            </div>                          
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        )
    }
) 

CardPopup.displayName = 'CardPopup'

export default withClickOutside(CardPopup);


