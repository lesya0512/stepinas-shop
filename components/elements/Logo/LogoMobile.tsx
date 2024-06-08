import Link from "next/link";

const LogoMobile = () => {
    return (
        <div>
            <Link className='logo' href='/'>
                <img className='logo_img' src='/img/LogoMob.svg' alt='logo' />
            </Link>
        </div>
    );
};

export default LogoMobile;