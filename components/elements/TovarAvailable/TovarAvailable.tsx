import { ITovarAvailableProps } from "@/types/elements";
import styles from '@/styles/tovar-list-item/index.module.scss'

const TovarAvailable = ({ inStock, vendorCode }: ITovarAvailableProps) => {
    const isInStock = +inStock > 0

    return (
        <div className={styles.tovar}>
            <span 
                className={`${styles.tovar__stock} ${
                    isInStock ? styles.tovar__stock__green : styles.tovar__stock__red
                }`}
            >
                {isInStock ? 'в наличии' : 'нет в наличии'}
            </span>
            <span className={styles.tovar__code}>
                .: {vendorCode}
            </span>

        </div>
    );
};

export default TovarAvailable;