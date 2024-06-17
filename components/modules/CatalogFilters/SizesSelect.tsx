import { basePropsForMotion } from "@/constants/motion";
import { useClickOutside } from "@/hooks/useClickOutside";
import { useSizeFilter } from "@/hooks/useSizeFilter";
import { AnimatePresence, motion } from "framer-motion";
import CheckboxSelectItem from "./CheckboxSelectItem";
import styles from '@/styles/catalog/index.module.scss'


const SizesSelect = ({ 
  handleApplayFiltersWithSizes 
}: {
  handleApplayFiltersWithSizes: (sizes: string[]) => void
}) => {
  const { open, ref, toggle } = useClickOutside();
  const { handleSelectSize, sizes, sizesOption } = useSizeFilter(
    handleApplayFiltersWithSizes
  )

  return (
    <div className={`${styles.catalog__filters__select} ${styles.catalog__filters__select_size}`} ref={ref}>
      <button
        className={`btn-reset ${styles.catalog__filters__btn}`}
        onClick={toggle}
      >
        {sizes.join(', ') ? (
          <span className={styles.catalog__filters__btn__inner}>
            <span className={styles.catalog__filters__btn__text}>
              Размер:
            </span>
            <span className={styles.catalog__filters__btn__info}>
              {sizes.join(', ')}
            </span>
          </span>
        ) : (
          'Размер: '
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.li
            {...basePropsForMotion}
            className={`list-reset ${styles.catalog__filters__list}`}
          >
            {sizesOption.map((item) => (
              <CheckboxSelectItem 
                key={item.id}
                item={item}
                callback={handleSelectSize}
              />
            ))}
          </motion.li>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SizesSelect;