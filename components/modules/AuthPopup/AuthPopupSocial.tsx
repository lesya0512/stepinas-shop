import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faGoogle, faVk, faYandex } from '@fortawesome/free-brands-svg-icons'

const AuthPopupSocial = ({
    handleSignupWithOAuth,
} : {
    handleSignupWithOAuth: VoidFunction
}) => {
    return (
        <div className="cart-body_socials">
            <button className="btn-reset socials_btn" 
                onClick={handleSignupWithOAuth}>
                    <FontAwesomeIcon icon={faGoogle}/>
            </button>
            <button className="btn-reset socials_btn" 
                onClick={handleSignupWithOAuth}>
                    <FontAwesomeIcon icon={faVk}/>
            </button>
            <button className="btn-reset socials_btn" 
                onClick={handleSignupWithOAuth}>
                    <FontAwesomeIcon icon={faYandex}/>
            </button>
            
        </div>
    );
};

export default AuthPopupSocial;