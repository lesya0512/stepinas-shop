import { motion } from 'framer-motion';
import { useUnit } from 'effector-react';

import PriceSelect from './PriceSelect';
import { ICatalogFiltersProps } from '@/types/catalog';
import SizesSelect from './SizesSelect';
import ColorsSelect from './ColorsSelect';
import SortSelect from './SortSelect';
import { useMediaQuery } from '@/hooks/useMediaQuery';
import { $colorsOption, $sizesOption, setColors, setColorsOptions, setFiltersPopup, setSizes, setSizesOptions } from '@/context/catalog';
import { basePropsForMotion } from '@/constants/motion';
import SelectInfoItem from './SelectInfoItem';
import styles from '@/styles/catalog/index.module.scss'
import FiltersPopup from './FiltersPopup/FiltersPopup';
import { addOverflowHiddenToBody } from '@/lib/utils/common';
 

const CatalogFilters = ({
  handleApplayFiltersWithPrice,
  handleApplayFiltersWithSizes,
  handleApplayFiltersWithColors,
  handleApplayFiltersBySort
}: ICatalogFiltersProps) => {
  const sizesOptions = useUnit($sizesOption)
  const colorsOptions = useUnit($colorsOption)
  const isMedia910 = useMediaQuery(910) 
  const isMedia610 = useMediaQuery(610) 

  const handleRemoveSizeOption = (id: number) => {
    const updatedOptions = sizesOptions.map((item) => 
      item.id == id ? { ...item, checked: false } : item
    )

    setSizesOptions(updatedOptions)  

    const updatedSizes = updatedOptions
      .filter((item) => item.checked)
      .map((item) => item.size)

    setSizes(updatedSizes)
    handleApplayFiltersWithSizes(updatedSizes)
  }

  const handleRemoveColorOption = (id: number) => {
    const updatedOptions = colorsOptions.map((item) => 
      item.id == id ? { ...item, checked: false } : item
    )

    setColorsOptions(updatedOptions)  

    const updatedColorsByText = updatedOptions
      .filter((item) => item.checked)
      .map(({ colorText }) => colorText)

    const updatedColorsByCode = updatedOptions
      .filter((item) => item.checked)
      .map(({ colorCode }) => colorCode)

    setColors(updatedColorsByText)
    handleApplayFiltersWithColors(updatedColorsByCode)
  }

  const handleOpenPopup = () => {
    addOverflowHiddenToBody()
    setFiltersPopup(true)
  }


  return (
    <>
      <FiltersPopup 
        handleApplayFiltersWithPrice={handleApplayFiltersWithPrice}
        handleApplayFiltersWithSizes={handleApplayFiltersWithSizes}
        handleApplayFiltersWithColors={handleApplayFiltersWithColors}

      />
      <div className={styles.catalog__filters}>
        <div className={styles.catalog__filters__top}>
          {!isMedia610 && (
            <>
              <div className={styles.catalog__filters__top__left}>
                {isMedia910 && (
                  <SizesSelect
                    handleApplayFiltersWithSizes={handleApplayFiltersWithSizes} 
                  />
                )}
                <PriceSelect
                  handleApplayFiltersWithPrice={handleApplayFiltersWithPrice} 
                />
              </div>
              {!isMedia910 && (
                <SizesSelect
                  handleApplayFiltersWithSizes={handleApplayFiltersWithSizes} 
                />
              )}
              <div className={styles.catalog__filters__top__right}>
                <ColorsSelect
                  handleApplayFiltersWithColors={handleApplayFiltersWithColors} 
                />
                <SortSelect 
                  handleApplayFiltersBySort={handleApplayFiltersBySort} 
                /> 
              </div>
            </>
          )}
          {isMedia610 && (
            <>
              <SortSelect 
                handleApplayFiltersBySort={handleApplayFiltersBySort}
              />
              <button 
                className={`btn-reset ${styles.catalog__filters__top__filter_btn}`}
                onClick={handleOpenPopup}
              />
            </>
          )}

        </div>

        <div className={styles.catalog__filters__bottom}>
          <motion.ul
            {...basePropsForMotion}
            className={`list-reset ${styles.catalog__filters__bottom__list}`}
          >
            {sizesOptions
              .filter((item) => item.checked)
              .map((item) => (
              <SelectInfoItem 
                key={item.id}
                id={item.id}
                text={item.size}
                handleRemoveItem={handleRemoveSizeOption}
              />
            ))}

            {colorsOptions
              .filter((item) => item.checked)
              .map((item) => (
              <SelectInfoItem 
                key={item.id}
                id={item.id}
                text={item.colorText}
                handleRemoveItem={handleRemoveColorOption}
              />
            ))}     
          </motion.ul>
        </div>
      </div>
    </>
  );
};

export default CatalogFilters;