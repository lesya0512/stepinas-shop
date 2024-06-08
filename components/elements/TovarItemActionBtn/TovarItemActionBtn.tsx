import styles from '@/styles/tovar-item-action-btn/index.module.scss'
import tooltipStyles from '@/styles/tooltip/index.module.scss'
import { AnimatePresence, motion } from 'framer-motion';
import Tooltip from '../Tooltip/Tooltip';
import { MutableRefObject, useEffect, useRef, useState } from 'react';
import { ITovarItemActionBtnProps } from '@/types/elements';


const TovarItemActionBtn = ({
    text, 
    callBack,
    iconClass,
    withTooltip = true,
}: ITovarItemActionBtnProps) => { 

    const [open, setOpen] = useState(false)
    const [tooltipLeft, setTooltipLeft] = useState(0)
    const showTooltip = () => setOpen(true)
    const hideTooltip = () => setOpen(false)
    const tooltipRef = useRef() as MutableRefObject<HTMLDivElement>

    useEffect(() =>  {
        if (open && withTooltip) {
            setTooltipLeft(tooltipRef.current.clientWidth)
        }
    }, [open, withTooltip])
     

    return (
        <div className={styles.action}>
            <button 
                className={`btn-reset ${styles.action__btn} ${styles[iconClass]}`} 
                onClick={callBack}
                onMouseEnter={showTooltip}
                onMouseLeave={hideTooltip}
            />
            {withTooltip && (
                <AnimatePresence>
                    {open && (
                        <motion.div 
                            initial = {{ opacity: 0 }}
                            animate = {{ opacity: 1 }}
                            exit = {{ opacity: 0 }}
                            className = {tooltipStyles.tooltip}
                            style = {{ left: `-${tooltipLeft + 13}px` }}
                            ref = {tooltipRef}
                        >
                            <Tooltip text = {text}/>
                        </motion.div>
                    )}
                </AnimatePresence>
            )}
        </div>
    );
};

export default TovarItemActionBtn;