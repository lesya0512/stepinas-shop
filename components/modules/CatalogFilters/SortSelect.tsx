import { basePropsForMotion } from "@/constants/motion";
import { useClickOutside } from "@/hooks/useClickOutside";
import styles from '@/styles/catalog/index.module.scss'
import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import SelectItem from "./SelectItem";
import { getSearchParamsUrl } from "@/lib/utils/common";

const SortSelect = ({ 
  handleApplayFiltersBySort 
}: {
  handleApplayFiltersBySort: (arg0: string) => void
}) => {
  const { open, ref, toggle } = useClickOutside();
  const [option, setOption] = useState(' ')

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const sizesParam = urlParams.get('sort')

    if (sizesParam) {
      const paramOption = sizesParam

      if (paramOption) {
        setOption(paramOption)
        handleApplayFiltersBySort(sizesParam)
      }
    }
  }, [])

  const sortOptions = [
    {id: 1, title: 'по возрастанию цены', filterHandler: () => handleApplayFiltersBySort('cheap')},
    {id: 2, title: 'по убыванию цены', filterHandler: () => handleApplayFiltersBySort('expensive')},
  ]  

  return (
    <div className={`${styles.catalog__filters__select} ${styles.catalog__filters__select_size}`} ref={ref}>
      <button
        className={`btn-reset ${styles.catalog__filters__btn}`}
        onClick={toggle}
      >
        {option ? (
          <span className={styles.catalog__filters__btn__inner}>
            <span className={styles.catalog__filters__btn__text}>
              Сортировать:
            </span>
            <span className={styles.catalog__filters__btn__info}>
              {option}
            </span>
          </span>
        ) : (
          'Сортировать: '
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.li
            {...basePropsForMotion}
            className={`list-reset ${styles.catalog__filters__list}`}
          >
            {sortOptions.map((item) => (
              <SelectItem 
                key={item.id}
                item={item}
                setOption={setOption}
                isActive={item.title === option}
              />
            ))}
          </motion.li>
        )}
      </AnimatePresence>
    </div>
  );
};

export default SortSelect;