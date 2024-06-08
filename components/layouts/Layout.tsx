'use client'

import { useMediaQuery } from '@/hooks/useMediaQuery';
import Footer from '../modules/Footer/Footer';
import Header from '../modules/Header/Header';
import MobileNavbar from '../modules/MobileNavbar/MobileNavbar';
import { AnimatePresence, motion } from 'framer-motion';
import QuickViewModal from '../modules/QuickViewModal/QuickViewModal';
import { useUnit } from 'effector-react';
import { $showQuickViewModal, $showSizeTable, showSizeTable } from '@/context/modals';
import { $openAuthPopup, openAuthPopup } from '@/context/auth';
import AuthPopup from '../modules/AuthPopup/AuthPopup';
import SizeTable from '../modules/SizeTable/SizeTable';

const Layout = ({ children }: { children: React.ReactNode }) => { 
    
    const isMedia800 = useMediaQuery(800)
    const showQuickViewModal = useUnit($showQuickViewModal)
    const openAuthPopup = useUnit($openAuthPopup)
    const showSizeTable = useUnit($showSizeTable)

    return (
        <>
            <Header />
            {children}
            
            {isMedia800 && <MobileNavbar />}

            <AnimatePresence>
                {openAuthPopup && (
                    <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.3 }}
                    exit={{ opacity: 0, scale: 0.5 }}
                    className='auth-popup-wrapper'>
                        <AuthPopup />
                    </motion.div>
                )}
            </AnimatePresence>

            <AnimatePresence>
                {showSizeTable && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            <SizeTable />
                    </motion.div>
                )}
            </AnimatePresence>

            {!isMedia800 && (
                <AnimatePresence>
                    {showQuickViewModal && (
                        <motion.div 
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}>
                            <QuickViewModal  />
                        </motion.div>
                    )}
                </AnimatePresence>
            )}

            <Footer />
        </>
)}


export default Layout;