import { useDebounceCallback } from '@/hooks/useDebounceCallback';
import { usePriceFilter } from '@/hooks/usePriceFilter';
import { getCheckedPriceFrom, getCheckedPriceTo } from '@/lib/utils/catalog';
import styles from "@/styles/catalog/index.module.scss";

const PriceFilter = ({handleApplayFiltersWithPrice}: {handleApplayFiltersWithPrice: (arg0: string, arg1: string) => void}) => {
  const {
    priceFrom,
    priceTo,
    setPriceFrom,
    setPriceTo,
    handleChangePriceFrom,
    handleChangePriceTo
  } = usePriceFilter();
  const delayCallback = useDebounceCallback(2000)

  const onPriceFromChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangePriceFrom(e)

    if (!priceTo) {
      return
    }

    const validPriceFrom = getCheckedPriceFrom(
      +e.target.value.replace(/[^0-9]+/g, '')
    ) as string;
    const validPriceTo = getCheckedPriceTo(+priceTo) as string;

    setPriceFrom(validPriceFrom)
    delayCallback(() => 
      handleApplayFiltersWithPrice(validPriceFrom, validPriceTo)
    )
  }

  const onPriceToChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    handleChangePriceTo(e)

    if (!priceFrom) {
      return
    }

    const validPriceFrom = getCheckedPriceFrom(+priceFrom) as string;
    const validPriceTo = getCheckedPriceTo(
      +e.target.value.replace(/[^0-9]+/g, '')
    ) as string;

    setPriceTo(validPriceTo)
    delayCallback(() => 
      handleApplayFiltersWithPrice(validPriceFrom, validPriceTo)
    )

  }
  
  return (
    <>
      <h3 className={styles.catalog__filters__popup__inner_title}>
        Цена:
      </h3>
      <div className={`
        ${styles.catalog__filters__list__item__inputs} ${styles.catalog__filters__popup__price__inputs}
        `}
      >
        <label>
          <span>От:</span>
          <input
            type='text'
            placeholder='1 000 рублей'
            value={priceFrom}
            onChange={onPriceFromChange}
          />
        </label>
        <label>
          <span>До:</span>
          <input
            type='text'
            placeholder='30 000 рублей'
            value={priceTo}
            onChange={onPriceToChange}
          />
        </label>
      </div>
    </>
  );
};

export default PriceFilter;