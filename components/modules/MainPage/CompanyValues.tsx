import styles from '@/styles/main/index.module.scss'

const CompanyValues = () => {
    return (
        <div className="container">
            <div className={styles.about_title}><h2>Ценности бренда</h2></div>
                <div className={styles.third_block}>
                    <div className={styles.third_block_item}>
                        <p>
                            <b>Индивидуальность</b> <br /><br />
                            Каждое изделие отшивается вручную, чтобы Вы ощутили свою уникальность и нашу заботу. 
                        </p>
                    </div>
                    <div className={styles.third_block_item}>
                        <p>
                            <b>Элегантность</b> <br /><br />
                            Изделия бренда имеют характер деловой одежды с добавлением деталей, соответствующих трендам. 
                        </p>
                    </div>
                    <div className={styles.third_block_item}>
                        <p>
                            <b>Ценность</b> <br /><br />
                            В изделиях используется итальянская ткань премиального качества. Одежда дышит и приятно контактирует с телом. На производстве осуществляется контроль качества пошива и посадки изделий.
                        </p>
                    </div>
                    <div className={styles.third_block_item}>
                        <p>
                            <b>Лимитированность</b> <br /><br />
                            Все изделия лимитировнны. А это означает, что шанс встретить кого-то в таком же изделии - минимален.
                        </p>
                    </div>
                </div>
        </div>
    );
};

export default CompanyValues;