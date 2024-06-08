'use client'

import About from "@/components/modules/MainPage/About";
import Categories from "@/components/modules/MainPage/Categories";
import CompanyValues from "@/components/modules/MainPage/CompanyValues";
import Goods from "@/components/modules/MainPage/Goods";
import MainBlock from "@/components/modules/MainPage/MainBlock";
import { MainPageGate } from "@/context/goods";
import { useGate } from "effector-react";

const MainPage = () => {
    useGate(MainPageGate)
    
    return (
        <div>
            <MainBlock />
            <About />
            {/* <Categories /> */}
            <CompanyValues />
            <Goods />
        </div>
    );
};

export default MainPage;