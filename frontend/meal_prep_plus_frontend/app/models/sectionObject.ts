import itemObject from "./itemObject";

export default interface SectionObject {
    name: string;
    items: itemObject[];
    inputAmount?: number | null,
    isHidden?: boolean | null,
}