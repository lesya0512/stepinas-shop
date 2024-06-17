import { useSizeFilter } from '@/hooks/useSizeFilter';
import CheckboxSelectItem from '../CheckboxSelectItem';
import styles from '@/styles/catalog/index.module.scss'

const SizesFilter = ({ 
  handleApplayFiltersWithSizes 
}: {
  handleApplayFiltersWithSizes: (sizes: string[]) => void
}) => {
  const { handleSelectSize, sizesOption } = useSizeFilter(
    handleApplayFiltersWithSizes
  )
  return (
    <>
      <h3 className={styles.catalog__filters__popup__inner_title}>
        Размер:
      </h3>
      <ul 
        className={`list-reset ${styles.catalog__filters__list} ${styles.filters_mobile}`}
      >
        {sizesOption.map((item) => (
          <CheckboxSelectItem 
            key={item.id}
            item={item}
            callback={handleSelectSize}
            mobileClassName={styles.filters_mobile}
          />
        ))}
      </ul>
    </>
  );
};

export default SizesFilter;
