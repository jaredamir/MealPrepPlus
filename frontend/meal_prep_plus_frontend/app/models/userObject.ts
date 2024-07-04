import itemObject from "./itemObject";
import SectionObject from "./sectionObject";

export default interface UserObject{
    name: string;
    ingredients: itemObject[];
    meals: SectionObject[];
};