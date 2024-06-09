import Link from "next/link";
import { useUnit } from "effector-react";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useEffect } from "react";
import { handleOpenAuthPopup, 
    isUserAuth, 
    triggerLoginCheck 
} from "@/lib/utils/common";
import Logo from "@/components/elements/Logo/Logo";
import LogoMobile from "@/components/elements/Logo/LogoMobile";
import CartPopup from "./CartPopup/CartPopup";
import HeaderProfile from "./HeaderProfile";

import { $isAuth } from "@/context/auth";
import { $user, loginCheckFx } from "@/context/user";
import { useMediaQuery } from "@/hooks/useMediaQuery";
import '../../../app/globalStyles/header.css'
import '../../../app/globalStyles/cartpopup.css'
import { addTovarsFromLSToCart, setCartFromLS, setShouldShowEmpty } from "@/context/cart";
import { useCartByAuth } from "@/hooks/useCartByAuth";

const Header = () => {
    const isAuth = useUnit($isAuth)
    
    const loginCheckSpinner = useUnit(loginCheckFx.pending)
    const isMedia400 = useMediaQuery(400)
    const user = useUnit($user)
    const currentCartByAuth = useCartByAuth()

    useEffect(() => {
        const auth = JSON.parse(localStorage.getItem('auth') as string)
        const cart = JSON.parse(localStorage.getItem('cart') as string)

        triggerLoginCheck()

        if (auth?.accessToken) {
            return
        }

        if (cart && Array.isArray(cart)) {
            if (!cart.length) {
                setShouldShowEmpty(true)
                return
            }
            setCartFromLS(cart)
        }
    }, [])

    useEffect(() => {
        if (isAuth) {
            const auth = JSON.parse(localStorage.getItem('auth') as string)
            const cartFromLS = JSON.parse(localStorage.getItem('cart') as string)

            if (cartFromLS && Array.isArray(cartFromLS)) {
                addTovarsFromLSToCart({
                    jwt: auth.accessToken,
                    cartItems: cartFromLS
                })
            }
        } 
    }, [isAuth])

    return (
        <div className="header">
            <div className="container header-container">
                <ul className="header-nav list-reset">
                    <li className="header-nav-item">
                        <Link 
                            href='/favotites' 
                            className="header-nav-item-btn header-nav-item-btn--favorite" 
                        />
                    </li>
                    
                    <li className="header-nav-item">
                        {isAuth ? (
                            <HeaderProfile />
                        ) : loginCheckSpinner ? (
                            <FontAwesomeIcon icon={faSpinner} spin color="#fff" />
                        ) : (
                             <button
                                className="btn-reset header-nav-item-btn header-nav-item-btn--profile"
                                onClick={handleOpenAuthPopup} 
                            />
                        )}
                    </li>
                    <li className="header-nav-item">
                        <CartPopup />
                    </li>
                </ul>
                <div className="header-logo">  
                    <Logo />
                </div>

                <div className="header-logo-mobile">
                    <LogoMobile />
                </div>
                <div className="header-btn">
                    <Link href='/catalog' className="btn-reset header-btn-link">
                        В каталог
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Header;
