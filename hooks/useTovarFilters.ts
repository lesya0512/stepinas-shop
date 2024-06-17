import { useUnit } from "effector-react";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { $tovars, loadTovarsByFilter, loadTovarsByFilterFx } from "@/context/goods";
import { checkOffsetParam, getSearchParamsUrl, updateSearchParam } from "@/lib/utils/common";
import { SearchParams } from "@/types/catalog";
import styles from '@/styles/catalog/index.module.scss'

export const useTovarFilters = (
  searchParams: SearchParams,
  type: string,
  isCatalog = false
) => {
  const tovars = useUnit($tovars);
  const isValidOffset = checkOffsetParam(searchParams.offset);
  const pagesCount = Math.ceil((tovars.count || 8) / 8);
  const [currentPage, setCurrentPage] = useState(
    isValidOffset ? +(searchParams.offset || 0) : 0
  );
  const pathname = usePathname();
  const tovarsSpinner = useUnit(loadTovarsByFilterFx.pending);

  useEffect(() => {
    const urlParams = getSearchParamsUrl();
    urlParams.delete('offset');

    const offset = isValidOffset ? +(searchParams.offset || 0) : 0;

    loadTovarsByFilter({
      limit: 8,
      offset: offset * 8,
      additionalParam: urlParams.toString(),
      isCatalog,
      type
    });

    updateSearchParam('offset', offset, pathname);
    setCurrentPage(offset);
  }, [searchParams.offset, pathname, type, isCatalog, isValidOffset]);

  const handlePageChange = ({ selected }: { selected: number }) => {
    const urlParams = getSearchParamsUrl();
    urlParams.delete('offset');

    loadTovarsByFilter({
      limit: 8 * selected + 8,
      offset: selected * 8,
      additionalParam: urlParams.toString(),
      isCatalog,
      type
    });

    updateSearchParam('offset', selected, pathname);
    setCurrentPage(selected);

    window.scrollTo({ top: 0, behavior: 'smooth' });
  }

  const handleApplayFiltersWithPrice = (priceFrom: string, priceTo: string) => {
    updateSearchParam('priceFrom', priceFrom, pathname)
    updateSearchParam('priceTo', priceTo, pathname)
    handlePageChange({ selected: 0 })
  }

  const handleApplayFiltersWithSizes = (sizes: string[]) => {
    updateSearchParam(
      'sizes', 
      encodeURIComponent(JSON.stringify(sizes)), 
      pathname 
    )
    handlePageChange({ selected: 0 })
  } 

  const handleApplayFiltersWithColors = (sizes: string[]) => {
    updateSearchParam(
      'colors', 
      encodeURIComponent(JSON.stringify(sizes)), 
      pathname 
    )
    handlePageChange({ selected: 0 })
  } 

  const handleApplayFiltersBySort = (sort: string) => {
    const urlParams = getSearchParamsUrl()
    const offset = urlParams.get('offset')

    updateSearchParam('sort', sort, pathname)

    handlePageChange({ 
      selected: checkOffsetParam(offset as string) ? +(offset || 0) : 0,
    })

  }

  const paginationProps = {
    containerClassName: `list-reset ${styles.catalog__bottom__list}`,
    pageClassName: `catalog-pagination-item ${styles.catalog__bottom__list__item}`,
    pageLinkClassName: styles.catalog__bottom__list__item__link,
    previousClassName: `catalog-pagination-prev ${styles.catalog__bottom__list__prev}`,
    nextClassName: `catalog-pagination-next ${styles.catalog__bottom__list__next}`,
    breakClassName: styles.catalog__bottom__list__break,
    breakLinkClassName: styles.catalog__bottom__list__break__link,
    breakLabel: '...',
    pageCount: pagesCount,
    forcePage: currentPage,
    onPageChange: handlePageChange
  };

  return {
    paginationProps,
    tovars,
    pagesCount,
    tovarsSpinner,
    handlePageChange,
    handleApplayFiltersWithPrice,
    handleApplayFiltersWithSizes,
    handleApplayFiltersWithColors,
    handleApplayFiltersBySort
  }
}
