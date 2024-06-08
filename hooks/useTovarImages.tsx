import { idGenerator } from "@/lib/utils/common";
import { ITovar } from "@/types/common";
import { useMemo } from "react";

export const useTovarImages = (cloth: ITovar) => {
    const images = useMemo(() => {
        const makeImagesObjects = (imagesArray: string[]) => 
            imagesArray.map((item) => ({
                src: item,
                alt: cloth.name,
                id: idGenerator(),
            }));

        if (cloth.images.length < 4) {
            const images = [];

            for(let i = 0; i < 4; i++) {
                images.push(cloth.images[0]);
            }

            return makeImagesObjects(images);
        }

        return makeImagesObjects(cloth.images);
    }, [cloth.images, cloth.name]); // Добавляем зависимости для useMemo

    return images;
};
