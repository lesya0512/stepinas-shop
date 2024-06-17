import { basePropsForMotion } from '@/constants/motion';
import { useClickOutside } from '@/hooks/useClickOutside';
import { useColorFilter } from '@/hooks/useColorFilter';
import styles from '@/styles/catalog/index.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import CheckboxSelectItem from './CheckboxSelectItem';


const ColorsSelect = ({ 
  handleApplayFiltersWithColors 
}: {
  handleApplayFiltersWithColors: (sizes: string[]) => void
}) => {
  const { open, ref, toggle } = useClickOutside();
  const { handleSelectColor, colors, colorsOption } = useColorFilter(handleApplayFiltersWithColors)


  return (
    <div className={styles.catalog__filters__select} ref={ref}>
      <button
        className={`btn-reset ${styles.catalog__filters__btn}`}
        onClick={toggle}
      >
        {colors.join(', ') ? (
          <span className={styles.catalog__filters__btn__inner}>
            <span className={styles.catalog__filters__btn__text}>
              Цвет:
            </span>
            <span className={styles.catalog__filters__btn__info}>
              {colors.join(', ')}
            </span>
          </span>
        ) : (
          'Цвет: '
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.li
            {...basePropsForMotion}
            className={`list-reset ${styles.catalog__filters__list}`}
          >
            {colorsOption.map((item) => (
              <CheckboxSelectItem 
                key={item.id}
                item={item}
                callback={handleSelectColor}
              />
            ))}
          </motion.li>
        )}
      </AnimatePresence>
    </div>
  );
};

export default ColorsSelect;