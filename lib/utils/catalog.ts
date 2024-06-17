export const getCheckedPriceFrom = (price: number) => 
  +price > 30000 ? '15000' : price 

export const getCheckedPriceTo = (price: number) => 
  +price > 30000 ? '30000' : price; 