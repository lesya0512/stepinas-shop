import { checkPriceParam, formatPrice, getSearchParamsUrl } from "@/lib/utils/common"
import React, { useEffect, useState } from "react"

export const usePriceFilter = () => {
  const [priceFrom, setPriceFrom] = useState('')
  const [priceTo, setPriceTo] = useState('')
  const [priceInfo, setPriceInfo] = useState('')

  const onPriceChange = (value: string, setState: (arg0: string) => void) => 
    setState(value.replace(/[^0-9]+/g, ''))

  const handleChangePriceFrom = (e: React.ChangeEvent<HTMLInputElement>) =>
    onPriceChange(e.target.value, setPriceFrom)

  const handleChangePriceTo = (e: React.ChangeEvent<HTMLInputElement>) =>
    onPriceChange(e.target.value, setPriceTo)

  const priceFromInfo = (priceFrom: string) => 
    `от ${formatPrice(+priceFrom)} р.`

  const priceToInfo = (priceTo: string) => 
    `от ${formatPrice(+priceTo)} р.`

  useEffect(() => {
    const urlParams = getSearchParamsUrl()
    const priceFromParam = urlParams.get('priceFrom')
    const priceToParam = urlParams.get('priceTo')

    if (priceFromParam && priceToParam) {
      if (checkPriceParam(+priceFromParam) && checkPriceParam(+priceToParam)) {
        setPriceFrom(priceFromParam)
        setPriceTo(priceToParam)
        setPriceInfo(
          `${priceFromInfo(priceFromParam)} ${priceToInfo(priceToParam)}`
        )
      }
    }
  }, [])

  return {
    priceFrom,
    priceTo,
    setPriceFrom,
    setPriceTo, 
    handleChangePriceFrom,
    handleChangePriceTo,
    priceInfo,
    setPriceInfo,
    priceFromInfo,
    priceToInfo
  }
}

// import { checkPriceParam, formatPrice, getSearchParamsUrl } from "@/lib/utils/common";
// import React, { useEffect, useState } from "react";

// export const usePriceFilter = () => {
//   const [priceFrom, setPriceFrom] = useState('');
//   const [priceTo, setPriceTo] = useState('');
//   const [priceInfo, setPriceInfo] = useState('');

//   const onPriceChange = (value: string, setState: (arg0: string) => void) => 
//     setState(value.replace(/[^0-9]+/g, ''));

//   const handleChangePriceFrom = (e: React.ChangeEvent<HTMLInputElement>) =>
//     onPriceChange(e.target.value, setPriceFrom);

//   const handleChangePriceTo = (e: React.ChangeEvent<HTMLInputElement>) =>
//     onPriceChange(e.target.value, setPriceTo);

//   const priceFromInfo = (priceFrom: string) => 
//     `от ${formatPrice(+priceFrom)} р.`;

//   const priceToInfo = (priceTo: string) => 
//     `до ${formatPrice(+priceTo)} р.`;

//   useEffect(() => {
//     const urlParams = getSearchParamsUrl();
//     const priceFromParam = urlParams.get('priceFrom');
//     const priceToParam = urlParams.get('priceTo');

//     if (priceFromParam && priceToParam) {
//       if (checkPriceParam(+priceFromParam) && checkPriceParam(+priceToParam)) {
//         setPriceFrom(priceFromParam);
//         setPriceTo(priceToParam);
//         setPriceInfo(
//           `${priceFromInfo(priceFromParam)} ${priceToInfo(priceToParam)}`
//         );
//       }
//     }
//   }, []);

//   return {
//     priceFrom,
//     priceTo,
//     setPriceFrom,
//     setPriceTo,
//     handleChangePriceFrom,
//     handleChangePriceTo,
//     priceInfo,
//     setPriceInfo,
//     priceFromInfo,
//     priceToInfo
//   };
// };
