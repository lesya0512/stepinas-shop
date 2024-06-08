import Link from 'next/link';
import React from 'react';

const Logo = () => {
    return (
        <div>
            <Link className='logo' href='/'>
                <img className='logo_img' src='/img/Logo.svg' alt='logo' />
            </Link>
        </div>
    );
};

export default Logo;