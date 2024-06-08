import { getCartItemCountBySize } from "@/lib/utils/common";
import { ITovarCountBySizeProps } from "@/types/goods";
import styles from '@/styles/tovar-count-indicator/index.module.scss'

const TovatCountBySize = ({
    tovars,
    size,
    withCartIcon = true,
}: ITovarCountBySizeProps) => (
    <>
        {!!getCartItemCountBySize (tovars, size) && (
            <span
                className={`${styles.count} ${withCartIcon ? styles.with_icon : ''}`}
            >
                <span>{getCartItemCountBySize(tovars, size)}</span>
            </span>
        )}
    </>
)
export default TovatCountBySize;