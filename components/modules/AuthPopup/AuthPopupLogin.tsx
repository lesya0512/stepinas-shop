import { signUpFx } from "@/api/auth";
import { handleSignIn } from "@/context/auth";
import { useAuthForm } from "@/hooks/useAuthForm";
import { IAuthSideProps, IInputs } from "@/types/auth-popup";
import EmailInput from "./EmailInput";
import PasswordInput from "./PasswordInput";
import AuthPopupClose from "./AuthPopupClose";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import AuthPopupSocial from "./AuthPopupSocial";

const AuthPopupLogin = ({ toggleAuth, isSideActive }: IAuthSideProps) => {
    const { spinner, register, errors, handleSubmit, handleSignupWithOAuth } = useAuthForm(
        signUpFx.pending,
        isSideActive,
        handleSignIn,
    )

    const submitForm = (data: IInputs) => handleSignIn({
        email: data.email,
        password: data.password,
        isOAuth: false,
    })
    return (
        <div className="card-back">
            <AuthPopupClose />
            <div className="card-body">
                <div className="auth-popup">
                    <h1 className="auth-popup-title">Личный кабинет</h1>
                </div>
                <form onSubmit={handleSubmit(submitForm)}>
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

                <p className="auth-popup-second-text">Впервые здесь?</p>
                    <button
                        type="button"
                        className="btn-reset inner_switch"
                        onClick={toggleAuth}>
                        Зарегестрироваться
                    </button>

                {/* <AuthPopupSocial handleSignupWithOAuth={handleSignupWithOAuth}/> */}

            </div>
        </div> 
    );
};

export default AuthPopupLogin;