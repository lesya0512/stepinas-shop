import { useMediaQuery } from '@/hooks/useMediaQuery';
import { IEmptyPageContentProps } from '@/types/modules';
import React from 'react';
import styles from '@/styles/empty-content/index.module.scss'
import ContentTitle from './ContentTitle';
import ContentLinks from './ContentLinks';


const EmptyPageContent = ({
  subtitle,
  description,
  btnText,
  bgClassName,
  title,
  oopsWord,
  emptyWord
}: IEmptyPageContentProps) => {
  const isMedia950 = useMediaQuery(950)
  const isMedia500 = useMediaQuery(500)
  const currentTitle = title ? title : 'Пустая страница'
  const currentOopsWord = oopsWord ? oopsWord : 'Упс'


  return (
    <div className={styles.empty_content}>
      {isMedia950 && <ContentTitle title={currentTitle} oopsWord={currentOopsWord} />}
      <div className={`${styles.empty_content__bg} ${bgClassName}`} />
      <div className={styles.empty_content__inner}>
        {/* <span className={styles.empty_content__word}>
          Пусто
        </span> */}
        {!isMedia950 && <ContentTitle title={currentTitle} oopsWord={currentOopsWord} />}
        <div className={styles.empty_content__subtitle}>{subtitle}</div>
        <div className={styles.empty_content__description}>{description}</div>
        {!isMedia500 && <ContentLinks btnText={btnText}/>}
      </div>
      {isMedia500 && <ContentLinks btnText={btnText}/>}
    </div>
  );
};

export default EmptyPageContent;