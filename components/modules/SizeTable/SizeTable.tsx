import { $sizeTableSizes } from "@/context/sizeTable";
import { useCartAction } from "@/hooks/useCartAction";
import { useUnit } from "effector-react";
import { useState } from "react";
import styles from '@/styles/size-table/index.module.scss'
import { $showQuickViewModal } from "@/context/modals";
import { closeSizeTableByCheck } from "@/lib/utils/common";
import AddToCartBtn from "../TovarListItem/AddToCartBtn";
import TovatCountBySize from "../TovarListItem/TovatCountBySize";

const SizeTable = () => {
    const showQuickViewModal = useUnit($showQuickViewModal)
    const [sSize, setSSize] = useState(false)
    const [mSize, setMSize] = useState(false)
    const [lSize, setLSize] = useState(false)
    const [xlSize, setXLSize] = useState(false)
    const [osersizeSize, setOversizeSize] = useState(false)
    const tovarSizes = useUnit($sizeTableSizes)
    const { 
        selectedSize, 
        setSelectedSize, 
        handleAddToCart, 
        cartItemBySize, 
        addToCartSpinner,
        currentCartItems,
        uprateCountSpinner,
    } = useCartAction(true)

    const isAnySizeSelected = 
    sSize || mSize || lSize || xlSize || osersizeSize || selectedSize
    
    const handleSelectSSize = () => {
        setSelectedSize('42')
        setSSize(true)
        setMSize(false)
        setLSize(false)
        setXLSize(false)
        setOversizeSize(false)
    }

    const handleSelectMSize = () => {
        setSelectedSize('44')
        setSSize(false)
        setMSize(true)
        setLSize(false)
        setXLSize(false)
        setOversizeSize(false)
    }

    const handleSelectLSize = () => {
        setSelectedSize('46')
        setSSize(false)
        setMSize(false)
        setLSize(true)
        setXLSize(false)
        setOversizeSize(false)
    }

    const handleSelectXLSize = () => {
        setSelectedSize('48')
        setSSize(false)
        setMSize(false)
        setLSize(false)
        setXLSize(true)
        setOversizeSize(false)
    }

    const handleSelectOversizeSize = () => {
        setSelectedSize('oversize')
        setSSize(false)
        setMSize(false)
        setLSize(false)
        setXLSize(false)
        setOversizeSize(true)
    }

    const clothSizes = [
        {
            id: 1,
            russianSize: '42',
            height: '160-170',
            bust: '88',
            waist: '68',
            hips: '94',
            selectHandle: handleSelectSSize,
            isSelected: sSize,
            isAvailable: tovarSizes.sizes[42],
            isInFavorite: false
        },
        {
            id: 2,
            russianSize: '44',
            height: '160-170',
            bust: '92',
            waist: '72',
            hips: '98',
            selectHandle: handleSelectMSize,
            isSelected: mSize,
            isAvailable: tovarSizes.sizes[44],
            isInFavorite: false
        },
        {
            id: 3,
            russianSize: '46',
            height: '160-170',
            bust: '96',
            waist: '76',
            hips: '102',
            selectHandle: handleSelectLSize,
            isSelected: lSize,
            isAvailable: tovarSizes.sizes[46],
            isInFavorite: false
        },
        {
            id: 4,
            russianSize: '48',
            height: '160-170',
            bust: '100',
            waist: '80',
            hips: '106',
            selectHandle: handleSelectXLSize,
            isSelected: xlSize,
            isAvailable: tovarSizes.sizes[48],
            isInFavorite: false
        },
        {
            id: 5,
            russianSize: 'oversize',
            height: 'all',
            bust: 'all',
            waist: 'all',
            hips: 'all',
            selectHandle: handleSelectOversizeSize,
            isSelected: osersizeSize,
            isAvailable: tovarSizes.sizes.oversize,
            isInFavorite: false
        },
    ]

    const handleCloseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

    const addToCart = () => handleAddToCart(+(cartItemBySize?.count || 1))
    
    const trProps = (
        item: {
            id: number
            russianSize: string
            height: string
            bust: string
            waist: string
            hips: string
            selectHandle: () => void
            isSelected: boolean
            isAvailable: boolean
        }
    ) => ({
        onClick: item.selectHandle,
        style: {
            backgroundColor: 
                item.isSelected || selectedSize === item.russianSize
                    ? '#242425'
                    : 'transparent',
            pointerEvents: item.isAvailable ? 'auto' : 'none',
            opacity: item.isAvailable ? 1 : 0.5,
            color: item.isAvailable ? '#fff' : 'rgba(255, 255, 255, .2)',
        },
    })
    
    return (
        <div className={styles.size_table}>
            <button 
                className={`btn-reset ${styles.size_table__close}`}
                onClick={handleCloseSizeTable}
            />
            <h2 className={styles.size_table_title}>
                Таблица размеров
            </h2>

            <div className={styles.size_table__inner}>
                <table className={styles.size_table__table}>
                    <thead>
                        <tr>
                            <th>Российский размер</th>
                            <th>Рост, см</th>
                            <th>Объем груди, см</th>
                            <th>Объем талии, см</th>
                            <th>Объем бедер, см</th>
                        </tr>
                    </thead>
                    <tbody>
                        {clothSizes.map(item => (
                            <tr key={item.id}
                                {...(trProps(
                                    item
                                ) as React.HTMLAttributes<HTMLTableRowElement>)}>
                                <td>{item.russianSize}</td>
                                <td>{item.height}</td>
                                <td>{item.bust}</td>
                                <td>{item.waist}</td>
                                <td>
                                    <TovatCountBySize
                                        size={item.russianSize}
                                        tovars={currentCartItems} 
                                    />
                                    {item.hips}
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
            <AddToCartBtn 
                className={styles.size_table__btn}
                handleAddToCart={addToCart}
                addToCartSpinner={addToCartSpinner || uprateCountSpinner}
                btnDisabled={!isAnySizeSelected || addToCartSpinner || uprateCountSpinner}
                text='Добавить в корзину'
            />
        </div>
    );
};

export default SizeTable;