import { nameValidationRules } from "@/lib/utils/auth"
import { IAuthInput } from "@/types/auth-popup"
import styles from "@/styles/auth-popup/index.module.scss"
import NameErrorMessage from "@/components/elements/nameErrorMessage/NameErrorMessage"


const NameInput = ({ register, errors }: IAuthInput) => {
    return (
        <div className={styles.form_block}>
            <input 
                type="text"
                className={styles.form_block_input} 
                placeholder="имя"
                {...register(
                    'name',
                    nameValidationRules(
                        'неверное значение',
                        'введите имя'
                    )
                )}
            />

            <NameErrorMessage 
                errors={errors}
                className={styles.error_alert}
                fieldName="name"
            />

        </div>
    )
}

export default NameInput