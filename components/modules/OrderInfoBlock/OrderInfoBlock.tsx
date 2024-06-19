'use client'
import { $choosenDeliveryAddressData, $choosenPickupAddressData } from '@/context/order/state';
import { useCartByAuth } from '@/hooks/useCartByAuth';
import { useTotalPrice } from '@/hooks/useTotalPrice';
import { countWholeCartItemsAmount } from '@/lib/utils/cart';
import { formatPrice, showCountMessage } from '@/lib/utils/common';
import styles from '@/styles/order-block/index.module.scss'
import { IOrderInfoBlockProps } from '@/types/modules';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { useUnit } from 'effector-react';
import Link from 'next/link';
import { MutableRefObject, useRef, useState } from 'react';
import toast from 'react-hot-toast';

const OrderInfoBlock = ({
  isCorrectPromotionalCode,
  isOrderPage
}: IOrderInfoBlockProps) => {
  const currentCartByAuth = useCartByAuth()
  const [isUserAgree, setIsUserAgree] = useState(false)
  const choosenPickupAddressData = useUnit($choosenPickupAddressData)
  const choosenDeliveryAddressData = useUnit($choosenDeliveryAddressData)
  const { animatedPrice } = useTotalPrice()
  const checkboxRef = useRef() as MutableRefObject<HTMLInputElement>
  const priceWithDiscount = isCorrectPromotionalCode
    ? formatPrice(Math.round(animatedPrice - animatedPrice * 0.3))
    : formatPrice(animatedPrice)

    const handleAgreementChange = () => setIsUserAgree(!isUserAgree)

    const handleTabCheckbox = (e: React.KeyboardEvent<HTMLLabelElement>) => {
      if (e.key == ' ' || e.code == 'Space') {
        e.preventDefault()
        setIsUserAgree(!checkboxRef.current.checked)
        checkboxRef.current.checked = !checkboxRef.current.checked
      }
    }

    // const handleMakePayment = async () => {
    //   if (
    //     !choosenDeliveryAddressData.address_line1 &&
    //     !choosenPickupAddressData.address_line1
    //   ) {
    //     const orderBlock = document.querySelector('.order-block') as HTMLLIElement
    //     scrollToBlock(orderBlock)
    //     toast.error('Нужно выбрать адрес!')
    //     return
    //   }
    // }
  
    return (
    <div className={styles.order_block}>
      <div className={styles.order_block__inner}>
        <p className={styles.order_block__info}>
          {countWholeCartItemsAmount(currentCartByAuth)}{' '}
          {showCountMessage(
            `${countWholeCartItemsAmount(currentCartByAuth)}`
          )}{' '}
          на сумму {' '}
          <span className={styles.order_block__info__text}>
            {formatPrice(animatedPrice)} рублей
          </span>
        </p>
        <p className={styles.order_block__info}>
          Суммма со скидкой: {' '}
          <span className={styles.order_block__info__text}>
            {priceWithDiscount} рублей
          </span>
        </p>
        {isOrderPage && <></>}
        <p className={styles.order_block__total}>
          <span>Итого:</span>
          <span className={styles.order_block__total__price}>
            {priceWithDiscount} рублей
          </span>
        </p>

        {isOrderPage ? ( 
          <button 
            className={`btn-reset ${styles.order_block__btn}`}
            disabled={!isUserAgree || !currentCartByAuth.length || false}
          >
            {false ? (
              <FontAwesomeIcon icon={faSpinner} spin color='#fff' />
            ) : (
              'Оформить заказ'
            )}
          </button>
        ) : (
          <Link
            href='/order'
            className={`${styles.order_block__btn} ${
              !isUserAgree || !currentCartByAuth.length ? styles.disabled : ''
            }`}
          >
            Оформить заказ
          </Link>
        )}
        <label className={styles.order_block__agreement}>
          <input
            className={styles.order_block__agreement__input}
            type='checkbox'
            tabIndex={-1}
            ref={checkboxRef}
            onChange={handleAgreementChange}
            checked={isUserAgree}
          />
          <span className={styles.order_block__agreement__mark} />
          <span
            className={styles.order_block__agreement__checkbox}
            tabIndex={0}
            onKeyDown={handleTabCheckbox}
          />
          <span className={styles.order_block__agreement__text}>
          Нажимая на кнопку «Оформить заказ», вы даете согласие на обработку{' '}
            <Link
              href='/privacy-policy'
              className={styles.order_block__agreement__link}
            >
              персональных данных
            </Link>
          </span>
        </label>
      </div>
    </div>
  );
};

export default OrderInfoBlock;