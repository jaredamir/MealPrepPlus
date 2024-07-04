import { AddIcon } from "@chakra-ui/icons"
import { Flex } from "@chakra-ui/react"
import itemObject from "@/app/models/itemObject"
import SectionObject from "@/app/models/sectionObject";
import variableItemObject from "@/app/models/variableItemObject";

interface ItemDataProps{
    itemData: SectionObject;
    addItem?: (item: variableItemObject) => void;
};
export default function ListSectionItem({itemData, addItem}: ItemDataProps){
    

    function totalCalories(obj: variableItemObject){
        var totalCalories = 0;
        obj.items.forEach((item: itemObject) => {
            if(item.inputAmount){
                totalCalories += item.cal * (item.inputAmount / item.serving_amount)
            }else{
                totalCalories += item.cal
            }
            
        })
        return totalCalories;
    }
         
    return(
        <>
            <Flex justifyContent={"space-between"} h={10} py={2} px={5} borderBottom={"0.5px solid lightgrey"}>
                {itemData.name && <p>{itemData.name}</p>}

                <p>{totalCalories(itemData)} Calories</p>
                
                {addItem && (<Flex columnGap={5} alignItems={"centers"}>
                    <AddIcon style={{cursor: "pointer"}} onClick={() => {addItem(itemData)}}/>
                </Flex>)}
            </Flex>
        </>
    )
}