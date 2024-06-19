'use client'
import OrderInfoBlock from '@/components/modules/OrderInfoBlock/OrderInfoBlock';
import OrderCartItem from '@/components/modules/OrderPage/OrderCartItem';
import OrderDelivery from '@/components/modules/OrderPage/OrderDelivery';
import OrderDetalisForm from '@/components/modules/OrderPage/OrderDetalisForm';
import OrderPayment from '@/components/modules/OrderPage/OrderPayment';
import OrderTitle from '@/components/modules/OrderPage/OrderTitle';
import { useCartByAuth } from '@/hooks/useCartByAuth';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from '@/styles/order/index.module.scss'

const OrderPage = () => {
  const currentCartByAuth = useCartByAuth()
  const isMedia1220 = useMediaQuery(1220)

  return (
    <main>
      <section className={styles.order}>
        <div className="container">
          <h1 className={styles.order__title}>Оформление заказа</h1>
          <div className={styles.order__inner}>
            <div className={styles.order__inner__left}>
              <ul className={`list-reset ${styles.oreder__list}`}>
                <li className={styles.order__list__item}>
                  <OrderTitle 
                    orderNumber='1'
                    text='Состав заказа'
                  />
                  {isMedia1220 ? (
                    <ul className={`list-reset ${styles.order__list__item__list}`}>
                      {currentCartByAuth.map((item, i) => (
                        <OrderCartItem 
                          key={item._id || item.clientId} 
                          item={item} 
                          position={i + 1}
                        />
                      ))}
                    </ul>
                  ) : (
                    <table className={styles.order__list__item__table}>
                      <thead>
                        <tr>
                          <th>Наименование</th>
                          <th>Размер</th>
                          <th>Цвет</th>
                          <th>Количество</th>
                          <th>Цена</th>
                        </tr>
                      </thead>
                      <tbody>
                        {currentCartByAuth.map((item, i) => (
                          <OrderCartItem 
                            key={item._id || item.clientId} 
                            item={item} 
                            position={i + 1}
                          />
                        ))}
                      </tbody>
                    </table>
                  )}
                </li>
                <li className={styles.order__list__item}>
                  <OrderDelivery />
                </li>
                <li>
                  <OrderTitle orderNumber='3' text='Оплата' />
                  <OrderPayment />
                </li>
                <li>
                  <OrderTitle orderNumber='4' text='Данные о получателе' />
                  <div className={styles.order__list__item__details}>
                    <p className={styles.order__list__item__details__title}>
                      Заполните форму:
                    </p>
                    <OrderDetalisForm />
                  </div>
                </li>
              </ul>
            </div>

            <div className={styles.order__inner__right}>
              <div className={styles.order__inner__right__order}>
                <OrderInfoBlock isOrderPage />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
};

export default OrderPage;