import { useColorFilter } from "@/hooks/useColorFilter";
import CheckboxSelectItem from "../CheckboxSelectItem";
import styles from "@/styles/catalog/index.module.scss";

const ColorsFilter = ({ 
  handleApplayFiltersWithColors 
}: {
  handleApplayFiltersWithColors: (sizes: string[]) => void
}) => {
  const { handleSelectColor, colorsOption } = useColorFilter(handleApplayFiltersWithColors)
  return (
    <>
      <h3 className={styles.catalog__filters__popup__inner_title}>
        Цвет:
      </h3>
      <ul 
        className={`list-reset ${styles.catalog__filters__list} ${styles.filters_mobile}`}
      >
        {colorsOption.map((item) => (
          <CheckboxSelectItem 
            key={item.id}
            item={item}
            callback={handleSelectColor}
            mobileClassName={styles.filters_mobile}
          />
        ))}
      </ul>
    </>
  );
};

export default ColorsFilter;