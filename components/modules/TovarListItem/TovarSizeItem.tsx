'use client'
import styles from '@/styles/quick-view-modal/index.module.scss'
import { ITovarSizesItemProps } from '@/types/goods';
import TovatCountBySize from './TovatCountBySize';

const TovarSizeItem = ({
    currentSize,
    selectedSize,
    setSelectedSize,
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    currentCartItems,
} : ITovarSizesItemProps) => {

    const handleSelectSize = () => setSelectedSize(currentSize[0])
    
    return (
        <li className={`${styles.modal__right__info__sizes__item} ${
            currentSize[1]
                ? ''
                : styles.modal__right__info__sizes__item__not_available
            }`}
            style = {{
                backgroundColor:
                    currentSize[0] === selectedSize
                        ? '#ffffff'
                        : 'rgba(255, 255, 255, 0.10)'
            }}
        >
            <TovatCountBySize 
                size={currentSize[0]}
                tovars={currentCartItems}
                withCartIcon={false}
            />
            <button className='btn-reset' onClick={handleSelectSize}>
                {currentSize[0]}
            </button>
        </li>
    );
};

export default TovarSizeItem;