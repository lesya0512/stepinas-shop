import { IDeleteCartItemBtnProps } from "@/types/cart";
import { faSpinner } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const DeleteCartItemBtn = ({
    btnDisabled,
    callBack,
    className
}: IDeleteCartItemBtnProps) => (
    <button
        className={`btn-reset cart-list__item__delete ${className}`}
        onClick={callBack}
        disabled={btnDisabled}
    >
        {btnDisabled ? (
            <FontAwesomeIcon icon={faSpinner} spin color="#fff" />
        ) : (
            <span />
        )}
    </button>
)

export default DeleteCartItemBtn;