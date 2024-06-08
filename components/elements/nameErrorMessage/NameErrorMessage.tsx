import { INameErrorMessageProps } from "@/types/auth-popup"

const NameErrorMessage = ({
    errors,
    className,
    fieldName,
}: INameErrorMessageProps) => {
    return (
        <>
            {errors[fieldName] &&  (
                <span className={className}>{errors[fieldName]?.message}</span>
            )}
            {errors[fieldName] && errors[fieldName]?.type === 'minLength' && (
                <span className={className}>'введите более двух символов'</span>
            )}
            {errors[fieldName] && errors[fieldName]?.type === 'maxLength' && (
                <span className={className}>'введите более менее двадцати пяти символов'</span>
            )}
        </>
    )
}

export default NameErrorMessage