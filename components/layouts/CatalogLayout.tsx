'use client'
// import { useBreadcrumbs } from "@/hooks/useBreadcrumbs";
import styles from '@/styles/catalog/index.module.scss'
import React, { Suspense } from "react";
import Breadcrumbs from "../modules/Breadcrumbs/Breadcrumds";

const CatalogLayout = ({ children} : { children: React.ReactNode }) => {
  // const { getDefaultTextGenerator, getTextGenerator } = 
  //   useBreadcrumbs('Каталог')

  return (
    <main>
      {/* <Suspense fallback={<div>Loading...</div>}>
          <Breadcrumbs 
              getDefaultTextGenerator={getDefaultTextGenerator}
              getTextGenerator={getTextGenerator}
          />
      </Suspense> */}
      <section className={styles.catalog}>
        <div className="container">{children}</div>
      </section>
    </main>
  );
};

export default CatalogLayout;