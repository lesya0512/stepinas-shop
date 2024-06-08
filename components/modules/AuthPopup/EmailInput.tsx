import { IAuthInput } from "@/types/auth-popup"
import styles from "@/styles/auth-popup/index.module.scss"
import { emailValidationRules } from "@/lib/utils/auth"

const EmailInput = ({ register, errors }: IAuthInput) => {
    return (
        <div className={styles.form_block}>
            <input 
                type="email"
                className={styles.form_block_input}  
                placeholder="почта"
                {...register(
                    'email',
                    emailValidationRules(
                        'неверное значение',
                        'введите корректный адрес электронной почты'
                    )
                )}
            />

            {errors.email && (
                <span className={styles.error_alert}>{errors.email?.message}</span>
            )}
        </div>
    )
}

export default EmailInput