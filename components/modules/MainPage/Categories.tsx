import styles from '@/styles/main/index.module.scss'
import Link from 'next/link';
import Image from 'next/image'
import img1 from '@/public/img/catalog-first.png'
import img2 from '@/public/img/catalog-second.png'
import img3 from '@/public/img/catalog-thitd.png'


const Categories = () => {
    return (
        <div className='container'>
            <div className={styles.categories}><h2>Категории</h2></div>

            <div className={styles.categories_area}>
                <ul className='list-reset'>
                <li><span className={styles.categories_area_maintext}>
                    Женские рубашки <br />
                    <Link href={'/catalog'}><button className={`btn-reset ${styles.categories_area_maintext_button}`}>Каталог</button></Link>
                </span><Image src={img1} alt="" /></li>
                <li><span className={styles.categories_area_maintext}>
                    Мужские рубашки <br />
                    <Link href={'/catalog'}><button className={`btn-reset ${styles.categories_area_maintext_button}`}>Каталог</button></Link>
                </span><Image src={img2} alt="" /></li>
                <li><span className={styles.categories_area_maintext}>
                    Чехлы для ноутбука <br />
                    <Link href={'/catalog'}><button className={`btn-reset ${styles.categories_area_maintext_button}`}>Каталог</button></Link>
                </span><Image src={img3} alt="" /></li>
                </ul>
            </div>
        </div>
    );
};

export default Categories;