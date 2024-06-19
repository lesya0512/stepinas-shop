import { basePropsForMotion } from '@/constants/motion';
import styles from '@/styles/order/index.module.scss'
import { motion } from 'framer-motion';
 
const OrderPayment = () => {
  return (
    <div className={styles.order__list__item__payment}>
      <motion.div
        {...basePropsForMotion}
        className={styles.order__list__item__payment__content}
      >
        <p>Выберите способ оплаты:</p>

        <form>
              <p className={styles.order__list__item__payment__content__radio}>
                <input
                  type='radio'
                  id='payment-1'
                  name='radio-group'
                  defaultChecked
                />
                <label
                  htmlFor='payment-1'
                  className={styles.order__list__item__payment__content__label}
                >
                  <span
                    className={
                      styles.order__list__item__payment__content__label__info
                    }
                  >
                    Номер карты:
                  </span>
                  <span>5555 5555 5555 5555</span>
                </label>
              </p>
              <p className={styles.order__list__item__payment__content__radio}>
                <input type='radio' id='payment-2' name='radio-group' />
                <label
                  htmlFor='payment-2'
                  className={styles.order__list__item__payment__content__label}
                >
                  QR-код
                </label>
              </p>
              <p className={styles.order__list__item__payment__content__radio}>
                <input type='radio' id='payment-3' name='radio-group' />
                <label
                  htmlFor='payment-3'
                  className={styles.order__list__item__payment__content__label}
                >
                  SberPay
                </label>
              </p>
            </form>
        
      </motion.div>
    </div>
  );
};

export default OrderPayment;