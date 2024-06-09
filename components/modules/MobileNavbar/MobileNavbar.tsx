import Link from 'next/link';

const MobileNavbar = () => {
    return (
        <div className='mobile-navbar'>
            <Link href='/' className='btn-reset mobile-navbar__btn'>
                главная
            </Link>
            <Link href='/catalog' className='btn-reset mobile-navbar__btn'>
                каталог
            </Link>
            <Link href='/favorites' className='btn-reset mobile-navbar__btn'>
                избранное
            </Link>
            <Link href='/cart' className='btn-reset mobile-navbar__btn'>
                корзина
            </Link>
        </div>
    );
};

export default MobileNavbar;