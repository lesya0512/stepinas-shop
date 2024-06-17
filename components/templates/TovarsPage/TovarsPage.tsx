'use client'
import ReactPaginate from 'react-paginate'
import { useTovarFilters } from "@/hooks/useTovarFilters";
import { ITovarsPage } from "@/types/catalog";
import styles from '@/styles/catalog/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import { motion } from 'framer-motion';
import { basePropsForMotion } from '@/constants/motion';
import TovarListItem from '@/components/modules/TovarListItem/TovarListItem';
import HeadingWithCount from '@/components/elements/HeadingWithCount/HeadingWithCount';
import CatalogFilters from '@/components/modules/CatalogFilters/CatalogFilters';

const TovarsPage = ({ searchParams, pageName }: ITovarsPage) => {
  const { 
    tovars, 
    tovarsSpinner, 
    paginationProps, 
    handlePageChange,
    handleApplayFiltersWithPrice,
    handleApplayFiltersWithSizes,
    handleApplayFiltersWithColors,
    handleApplayFiltersBySort
  } = useTovarFilters(
    searchParams, 
    pageName, 
    pageName === 'catalog'
  )
  
  return (
    <>
      <HeadingWithCount 
          count={tovars.count}
          title='Каталог'
          spinner={tovarsSpinner}
      />
      <CatalogFilters 
        handleApplayFiltersWithPrice={handleApplayFiltersWithPrice}
        handleApplayFiltersWithSizes={handleApplayFiltersWithSizes}  
        handleApplayFiltersWithColors={handleApplayFiltersWithColors}
        handleApplayFiltersBySort={handleApplayFiltersBySort}
      />

      {tovarsSpinner && (
        <motion.ul
          {...basePropsForMotion}
          className={skeletonStyles.skeleton}
          style={{ marginBottom: 60 }}
        >
          {Array.from(new Array(8)).map((_, i) => (
            <li key={i} className={skeletonStyles.skeleton__item}>
              <div className={skeletonStyles.skeleton__item__light}/>
            </li>
          ))}
        </motion.ul>
      )}

      {!tovarsSpinner && (
        <motion.ul {...basePropsForMotion} className={`list-reset ${styles.catalog__list}`}>
         {(tovars.items || []).map((item) => (
          <TovarListItem key={item._id} item={item}/>
         ))} 
        </motion.ul>
      )}

      {!tovars.items?.length && !tovarsSpinner && (
        <div className={styles.catalog__list__empty}>
          Ничего не найдено 
        </div>
      )}

      <div className={styles.catalog__bottom}>
        <ReactPaginate 
          {...paginationProps}
          nextLabel={<span>Следующая страница</span>}
          previousLabel={<span>Предыдущая страница</span>}
          onPageChange={handlePageChange}
        />
      </div>
    </>
  );
};

export default TovarsPage;