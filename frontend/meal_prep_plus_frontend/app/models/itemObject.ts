export default interface itemObject{
    name: string,
    serving_amount: number,
    measurement: string,
    inputAmount?: number | null,
    isHidden?: boolean | null,
    cal: number,
    pro: number,
    carb: number,
    fats: number,
    sugar: number,
    price: number,
};