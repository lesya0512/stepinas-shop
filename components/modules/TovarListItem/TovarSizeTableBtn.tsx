import { $showQuickViewModal, showSizeTable } from "@/context/modals";
import { setSizeTableSizes } from "@/context/sizeTable";
import { addOverflowHiddenToBody } from "@/lib/utils/common";
import { ISelectedSizes } from "@/types/common";
import { useUnit } from "effector-react";

const TovarSizeTableBtn = ({ sizes, type, className }: ISelectedSizes) => {
    const showQuickViewModal = useUnit($showQuickViewModal)

    const handleShowSizeTable = () => {
        if (!showQuickViewModal) {
            addOverflowHiddenToBody()
        }

        setSizeTableSizes({ sizes, type })
        showSizeTable()
    }

    return (
        <div>
            <button className={`btn-reset ${className}`} onClick={handleShowSizeTable}>
                Таблица размеров
            </button>
        </div>
    );
};

export default TovarSizeTableBtn;