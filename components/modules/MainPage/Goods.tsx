import { getNewProductFx } from "@/api/main-page";
import { $newProduct } from "@/context/goods";
import { useUnit } from "effector-react";
import GoodsSection from "./GoodsSection";

const Goods = () => {
    const goods = useUnit($newProduct)
    const spinner = useUnit(getNewProductFx.pending) 
 
    return (
        <GoodsSection 
            goods={goods}
            spinner={spinner} 
        />
    );
};

export default Goods;