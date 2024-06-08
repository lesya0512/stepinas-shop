import styles from '@/styles/main/index.module.scss'

const MainBlock = () => {
    return (
        <div className={styles.main}>
            <div className={styles.main_image}>
                <h1 className={styles.main_image_title}>Бренд деловой одежды <br /> от сотрудницы банка</h1>
            </div>
        </div>
    );
};

export default MainBlock;