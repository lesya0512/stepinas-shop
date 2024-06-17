import { $filtersPopup, setFiltersPopup } from '@/context/catalog';
import { $tovars, loadTovarsByFilterFx } from '@/context/goods';
import { useMenuAnimation } from '@/hooks/useMenuAnimation';
import { removeOverflowHiddenFromBody, showCountMessage } from '@/lib/utils/common';
import { ICatalogFiltersProps } from '@/types/catalog';
import { useUnit } from 'effector-react';
import { AnimatePresence, motion } from 'framer-motion';
import PriceFilter from './PriceFilter';
import SizesFilter from './SizesFilter';
import ColorsFilter from './ColorsFilter';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSpinner } from '@fortawesome/free-solid-svg-icons';
import styles from '@/styles/catalog/index.module.scss'

const FiltersPopup = ({
  handleApplayFiltersWithPrice,
  handleApplayFiltersWithSizes,
  handleApplayFiltersWithColors,
}: Omit<ICatalogFiltersProps , 'handleApplayFiltersBySort'>) => {
  const filtersPopup = useUnit($filtersPopup)
  const tovars = useUnit($tovars);
  const tovarsSpinner = useUnit(loadTovarsByFilterFx.pending);
  const { itemVariants, sideVariants, popupZIndex } = useMenuAnimation(
    102, 
    filtersPopup
  )

  const handleClosePopup = () => {
    removeOverflowHiddenFromBody()
    setFiltersPopup(false)
  }

  return (
    <div 
      style={{ zIndex: popupZIndex }} 
      className={styles.catalog__filters__popup}
    >
      <AnimatePresence>
        {filtersPopup && (
          <motion.aside
            initial={{ width: 0 }}
            animate={{
              width: '100%',
            }}
            exit={{
              width: 0,
              transition: { delay: 0.7, duration: 0.3 },
            }}
            className={styles.catalog__filters__popup__aside}
          >
             <motion.div
              className={styles.catalog__filters__popup__inner}
              initial='closed'
              animate='open'
              exit='closed'
              variants={sideVariants}
            >
              <motion.button
                className={`btn-reset ${styles.catalog__filters__popup__close}`}
                variants={itemVariants}
                onClick={handleClosePopup}
              />

              <motion.h2
                variants={itemVariants}
                className={styles.catalog__filters__popup__title}
              >
                Фильтры
              </motion.h2>

              <motion.div
                className={styles.catalog__filters__popup__price}
                variants={itemVariants}
              >
                <PriceFilter
                  handleApplayFiltersWithPrice={handleApplayFiltersWithPrice} 
                />
              </motion.div>

              <motion.div
                className={styles.catalog__filters__popup__sizes}
                variants={itemVariants}
              >
                <SizesFilter 
                  handleApplayFiltersWithSizes={handleApplayFiltersWithSizes}
                />
              </motion.div>

              <motion.div
                className={styles.catalog__filters__popup__sizes}
                variants={itemVariants}
              >
                <ColorsFilter 
                  handleApplayFiltersWithColors={handleApplayFiltersWithColors}
                />
              </motion.div>

              <motion.button
                variants={itemVariants}
                className={`btn-reset ${styles.catalog__filters__popup__apply}`}
                onClick={handleClosePopup}
              >
                {tovarsSpinner ? (
                  <FontAwesomeIcon icon={faSpinner} spin/>
                ) : !!tovars.count ? (
                  `Найдено ${
                    tovars.count
                  } ${showCountMessage(`${tovars.count}`)}`
                ) : (
                  'Ничего не найдено'
                )}
              </motion.button>
            </motion.div>
          </motion.aside>
        )}
      </AnimatePresence>
      
    </div>
  );
};

export default FiltersPopup;