import { useUnit } from 'effector-react'
import { $showQuickViewModal } from '@/context/modals'
import { closeAuthPopupWhenSomeModalOpened } from '@/lib/utils/common'

const AuthPopupClose = () => {

    const showQuickViewModal = useUnit($showQuickViewModal)

    const closePopup = () => 
        closeAuthPopupWhenSomeModalOpened(showQuickViewModal)

    return <button className='btn-reset auth-popup-close' onClick={closePopup} />
};

export default AuthPopupClose;