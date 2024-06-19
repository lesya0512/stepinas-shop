import React from 'react';
import styles from '@/styles/main/index.module.scss'
import skeletonStyles from '@/styles/skeleton/index.module.scss'
import AllLink from '@/components/elements/AllLink/AllLink';
import { IMainPageSectionProps } from '@/types/main-page';
import { motion } from 'framer-motion';
import { basePropsForMotion } from '@/constants/motion';
import TovarListItem from '../TovarListItem/TovarListItem';
import '../../../app/globalStyles/mainpagegoods.css'

const GoodsSection = ({ goods, spinner }: IMainPageSectionProps) => {
    return (
        <section className={styles.main_section}>
            <div className={`container ${styles.main_section__container}`}>

            <h2 className={`site-title ${styles.main_section__title}`}>Новинки</h2>

            <div className={styles.main_section__inner}>
                
                {spinner && (
                    <motion.ul
                        className={skeletonStyles.skeleton}
                        {...basePropsForMotion}
                    >
                        {Array.from(new Array(4)).map((_, i) => (
                            <li key={i} className={skeletonStyles.skeleton__item}>
                                <div className={skeletonStyles.skeleton__item__light} />
                            </li>
                        ))}
                    </motion.ul>
                )}
                {!spinner && (
                    <motion.ul
                        className={`main-goods list-reset ${styles.main_section__list}`}
                        {...basePropsForMotion}
                    >
                        {goods.map((item) => (
                            <TovarListItem key={item._id} item={item} />
                            // <li key={item._id}>{item.name}</li>
                        ))}
                    </motion.ul>
                )}
            </div>
            <AllLink />
            </div>
        </section>
    );
};

export default GoodsSection;
