import { basePropsForMotion } from "@/constants/motion";
import { useClickOutside } from "@/hooks/useClickOutside";
import { usePriceFilter } from "@/hooks/usePriceFilter";
import { getCheckedPriceFrom, getCheckedPriceTo } from "@/lib/utils/catalog";
import styles from "@/styles/catalog/index.module.scss";
import { AnimatePresence, motion } from "framer-motion";

  const PriceSelect = ({handleApplayFiltersWithPrice}: { handleApplayFiltersWithPrice: (arg0: string, arg1: string) => void }) => {
  const { open, ref, toggle, setOpen } = useClickOutside();
  const {
    priceFrom,
    priceTo,
    setPriceFrom,
    setPriceTo,
    handleChangePriceFrom,
    handleChangePriceTo,
    priceInfo,
    setPriceInfo,
    priceFromInfo,
    priceToInfo
  } = usePriceFilter();

  const handleSelectPrice = () => {
    const validPriceFrom = getCheckedPriceFrom(+priceFrom) as string;
    const validPriceTo = getCheckedPriceTo(+priceTo) as string;

    setPriceFrom(validPriceFrom);
    setPriceTo(validPriceTo);
    setPriceInfo(
      `${priceFromInfo(validPriceFrom)} ${priceToInfo(validPriceTo)}`
    );
    setOpen(false);
    handleApplayFiltersWithPrice(validPriceFrom, validPriceTo);
  };

  return (
    <div className={styles.catalog__filters__select} ref={ref}>
      <button
        className={`btn-reset ${styles.catalog__filters__btn}`}
        onClick={toggle}
      >
        {priceInfo ? (
          <span className={styles.catalog__filters__btn__inner}>
            <span className={styles.catalog__filters__btn__text}>
              Цена:
            </span>
            <span className={styles.catalog__filters__btn__info}>
              {priceInfo}
            </span>
          </span>
        ) : (
          'Цена:'
        )}
      </button>

      <AnimatePresence>
        {open && (
          <motion.li
            {...basePropsForMotion}
            className={`list-reset ${styles.catalog__filters__list}`}
          >
            <li
              className={`${styles.catalog__filters__list__item} ${styles.catalog__filters__list__item_price}`}
            >
              <div className={styles.catalog__filters__list__item__inputs}>
                <label>
                  <span>От:</span>
                  <input
                    type="text"
                    placeholder="1 000 рублей"
                    value={priceFrom}
                    onChange={handleChangePriceFrom}
                  />
                </label>
                <label>
                  <span>До:</span>
                  <input
                    type="text"
                    placeholder="30 000 рублей"
                    value={priceTo}
                    onChange={handleChangePriceTo}
                  />
                </label>
              </div>
              <button
                className={`btn-reset ${styles.catalog__filters__list__item__done}`}
                disabled={!priceFrom || !priceTo}
                onClick={handleSelectPrice}
              >
                Готово
              </button>
            </li>
          </motion.li>
        )}
      </AnimatePresence>
    </div>
  );
};

export default PriceSelect;
