import { IAuthInput } from "@/types/auth-popup"
import styles from "@/styles/auth-popup/index.module.scss"

const PasswordInput = ({ register, errors }: IAuthInput ) => {

    return (
        <div className={styles.form_block} >
            <input 
                type="password"
                className={styles.form_block_input}  
                placeholder="пароль"
                {...register('password', {
                    required: 'неверное значение',
                    minLength: 4,
                    maxLength: 50,
                })}
            />
            {errors.password &&  (
                <span className={styles.error_alert}>{errors.password?.message}</span>
            )}
            {errors.password && errors.password?.type === 'minLength' && (
                <span className={styles.error_alert}>'введите более четырех символов'</span>
            )}
            {errors.password && errors.password?.type === 'maxLength' && (
                <span className={styles.error_alert}>'введите менее пятидесяти символов'</span>
            )}
        </div>
    )

}

export default PasswordInput