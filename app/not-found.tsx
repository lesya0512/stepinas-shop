'use client'
import EmptyPageContent from '@/components/modules/EmptyPageContent/EmptyPageContent';
import styles from '@/styles/not-found/index.module.scss'

const NotFound = () => {
  return (
    <main>
      <section className={styles.not_found}>
          <div className='container'>
              <EmptyPageContent 
                  subtitle='Страница находится в разработке'
                  description='404'
                  btnText='Продолжить покупки'
                  bgClassName={styles.empty_bg}
                  emptyWord='Страница не найдена'
                  oopsWord='Упс'
              />
          </div>
      </section>
    </main>
  );
};

export default NotFound;