import { useState } from "react";
import AuthPopupReg from "./AuthPopupReg";
import { handleCloseAuthPopup } from "@/lib/utils/common";
import '../../../app/globalStyles/auth-popup.css'
import '../../../app/globalStyles/globals.css'
import AuthPopupLogin from "./AuthPopupLogin";

const AuthPopup = () => {

    const [isAuthSwitched, setIsAuthSwitched] = useState(false)
    const [isSignInActive, setIsSignInActive] = useState(false)
    const [isSignUpActive, setIsSignUpActive] = useState(true)

    const toggleAuth = () => {
        setIsAuthSwitched(!isAuthSwitched)
        setIsSignInActive(!isSignInActive)
        setIsSignUpActive(!isSignUpActive)
    }
    
    return (
        <div className='container auth-popup'>
            <div className={`auth-popup__card ${isAuthSwitched ? 'switched' : ''}`}>
                <div className='auth-popup__card__inner'>
                <AuthPopupReg
                    toggleAuth={toggleAuth}
                    isSideActive={isSignUpActive}
                />
                <AuthPopupLogin
                    toggleAuth={toggleAuth}
                    isSideActive={isSignInActive}
                />
                </div>
            </div> 
        </div>
    );
};

export default AuthPopup;