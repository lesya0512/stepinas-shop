'use client'
import { $openAuthPopup } from "@/context/auth";
import { EarthoOneProvider } from '@eartho/one-client-react';
import { $showQuickViewModal, $showSizeTable, closeQuickViewModal, showSizeTable } from "@/context/modals";
import { closeSizeTableByCheck, handleCloseAuthPopup } from "@/lib/utils/common";
import { useUnit } from "effector-react";
import { Next13ProgressBar } from 'next13-progressbar'
import Layout from "./Layout";
import { removeOverflowHiddenFromBody } from "@/lib/utils/common";
import { Toaster } from "react-hot-toast";
import { useEffect, useState } from "react";
import CookieAlert from "../modules/CookieAlert/CookieAlert";
import { motion } from "framer-motion";

import '@/context/order/init'

const PagesLayout = ({ children } : {children: React.ReactNode}) => {
    const openAuthPopup = useUnit($openAuthPopup)
    const [cookieAlertOpen, setCookieAlertOpen] = useState(false)
    const showQuickViewModal = useUnit($showQuickViewModal)
    const showSizeTable = useUnit($showSizeTable)

    const handleCloseQuickViewModal = () => {
      removeOverflowHiddenFromBody()
      closeQuickViewModal()
    }

    const handleCLoseSizeTable = () => closeSizeTableByCheck(showQuickViewModal)

    useEffect(() => {
      const checkCookie = document.cookie.indexOf('CookieBy=Stepinas')
      checkCookie != -1
        ? setCookieAlertOpen(false)
        : setTimeout(() => setCookieAlertOpen(true), 3000)
    }, [])

    return (
      <>
          <EarthoOneProvider 
            domain={`${process.env.NEXT_PUBLIC_OAUTH_DOMAIN}`}
            clientId={`${process.env.NEXT_PUBLIC_OAUTH_CLIENT_ID}`}
          >
            <html lang="en">
              <body>
                <Next13ProgressBar height='4px' color='#fff' showOnShallow/>
                <Layout>{children}</Layout>
        
                <div
                  className={`auth-overlay ${
                    openAuthPopup ? 'overlay-active' : ''
                  }`}
                  onClick={handleCloseAuthPopup}
                />
        
                <Toaster position="top-center" reverseOrder={false} />
        
                <div 
                  className={`quick-view-modal-overlay ${
                    showQuickViewModal ? 'overlay-active' : ''
                  }`}
                  onClick={handleCloseQuickViewModal}
                />

                <div 
                  className={`size-table-overlay ${
                    showSizeTable ? 'overlay-active' : ''
                  }`}
                  onClick={handleCLoseSizeTable}
                />

                {
                  cookieAlertOpen && (
                    <motion.div
                      initial={{ opacity: 0, scale: 0.5 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.5 }}
                      className='cookie-popup'
                    >
                      <CookieAlert setCookieAlertOpen={setCookieAlertOpen} />
                    </motion.div>
                  )
                }
        
              </body>
            </html>
          </EarthoOneProvider>
      </>
     );
};

export default PagesLayout;