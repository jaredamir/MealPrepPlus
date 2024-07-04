import itemObject from "./itemObject"

export default interface variableItemObject{
    name: string,
    items: itemObject[]
    inputAmount?: number | null,
    isHidden?: boolean | null,
};