import { ITovarLabelProps } from "@/types/modules";
import styles from '@/styles/tovar-list-item/index.module.scss'

const TovarLabel = ({ isNew }: ITovarLabelProps) => {

    const NewLabel = (
        <span className={`${styles.list_item__label}`}>
            Новинка
        </span>
    )

    return NewLabel;
};

export default TovarLabel;