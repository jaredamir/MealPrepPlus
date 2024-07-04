import { AddIcon } from "@chakra-ui/icons"
import { Flex } from "@chakra-ui/react"
import itemObject from "@/app/models/itemObject"
import SectionObject from "@/app/models/sectionObject";

interface ItemDataProps{
    itemData: itemObject;
    addItem?: (item: itemObject) => void;
};
export default function ListItem({itemData, addItem}: ItemDataProps){

    return(
        <>
            <Flex justifyContent={"space-between"} h={10} py={2} px={5} borderBottom={"0.5px solid lightgrey"}>
                { itemData.measurement && (
                    <Flex columnGap={5}>
                        <Flex w={"50px"} justifyContent={"right"}>
                            <p>{itemData.serving_amount.toString()}</p>
                        </Flex>
                        <p>{itemData.measurement}</p>
                    </Flex>
                )}

                {itemData.name && <p>{itemData.name}</p>}

                <p>{itemData.cal} Calories</p>
                
                {addItem && (<Flex columnGap={5} alignItems={"centers"}>
                    <AddIcon style={{cursor: "pointer"}} onClick={() => {addItem(itemData)}}/>
                </Flex>)}
            </Flex>
        </>
    )
}