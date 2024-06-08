import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { faSpinner } from '@fortawesome/free-solid-svg-icons'
import { IAuthSideProps, IInputs } from "@/types/auth-popup";
import AuthPopupClose from "./AuthPopupClose";
import { useAuthForm } from "@/hooks/useAuthForm";
import { signUpFx } from "@/api/auth";
import { handleSignUp } from "@/context/auth";
import NameInput from "./NameInput";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import AuthPopupSocial from './AuthPopupSocial';

const AuthPopupReg = ({
    toggleAuth,
    isSideActive
} : IAuthSideProps) => {

    const { spinner, register, errors, handleSubmit, handleSignupWithOAuth } = useAuthForm(
        signUpFx.pending,
        isSideActive,
        handleSignUp
    )

    const submitForm = (data: IInputs) => handleSignUp({
        name: data.name,
        email: data.email,
        password: data.password,
        isOAuth: false,
    })

    return (
        <div className='card-front'>
            <AuthPopupClose />

            <div className="card-body">
                <div className="auth-popup">
                    <h1 className="auth-popup-title">Личный кабинет</h1>
                </div>
                <form onSubmit={handleSubmit(submitForm)}>
                    <NameInput register={register} errors={errors}/>
                    <EmailInput register={register} errors={errors}/>
                    <PasswordInput register={register} errors={errors} />

                    <button 
                        type="submit"
                        className="btn-reset inner_btn"
                        disabled={spinner}>
                            {spinner ? (
                                <FontAwesomeIcon icon={faSpinner} spin />
                            ) : ('Войти')}
                    </button>
                </form>

                <p className="auth-popup-second-text">Уже зарегестрированы?</p>
                    <button
                        type="button"
                        className="btn-reset inner_switch"
                        onClick={toggleAuth}>
                        Авторизоваться
                    </button>

                {/* <AuthPopupSocial handleSignupWithOAuth={handleSignupWithOAuth}/> */}

            </div>
        </div>
    );
};

export default AuthPopupReg;