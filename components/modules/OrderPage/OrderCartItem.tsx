import Image from 'next/image'
import { useMediaQuery } from '@/hooks/useMediaQuery';
import styles from '@/styles/order/index.module.scss'
import { IOrderCartItemProps } from '@/types/order';
import { formatPrice } from '@/lib/utils/common';

const OrderCartItem = ({ item, position }: IOrderCartItemProps) => {
  const isMedia1220 = useMediaQuery(1220)
  
  return (
    <>
     {isMedia1220 ? (
      <li className={styles.order__list__item__list__item}>
        <span className={styles.order__list__item__list__item__pos}>
          {position}.
        </span>
        <div className={styles.order__list__item__list__item__img}>
          <Image src={item.image} alt={item.name} width={156} height={156} />
        </div>
        <div className={styles.order__list__item__list__item__inner}>
          <span className={styles.order__list__item__list__item__name}>
            {item.name}
          </span>
          <span className={styles.order__list__item__list__item__info}>
            <span>Цвет: </span>
            {item.color}
          </span>
          {item.size && (
            <span className={styles.order__list__item__list__item__info}>
              <span>Размер: </span>
              {item.size}
            </span>
          )}
          <span className={styles.order__list__item__list__item__info}>
            <span>Количество: </span>
            {item.count} шт.
          </span>
          <span className={styles.order__list__item__list__item__info}>
            <span>Итого: </span>
            {formatPrice(+item.price * +item.count)} рублей
          </span>
        </div>
      </li>
     ) : (
      <tr>
        <td className={styles.order__list__item__table__name}>
          <span>{position}.</span>
          <Image src={item.image} alt={item.name} width={109} height={109} />
          <span>{item.name}</span>
        </td>
        <td className={styles.order__list__item__table__block}>
          <span>{item.size}</span>
        </td>
        <td className={styles.order__list__item__table__block}>
          <span>
            {item.color}
          </span>
        </td>
        <td className={styles.order__list__item__table__block}>
          <span>{item.count} шт.</span>
        </td>
        <td className={styles.order__list__item__table__block}>
          <span>{formatPrice(+item.price * +item.count)} рублей</span>
        </td>
      </tr>
     )} 
    </>
  );
};

export default OrderCartItem;