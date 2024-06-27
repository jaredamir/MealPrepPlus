import { AddIcon } from "@chakra-ui/icons"
import { Flex } from "@chakra-ui/react"

interface itemObject{
    name: string,
    serving_amount: number,
    measurement: string,
    cal: number,
    pro: number,
    carb: number,
    fats: number,
    sugar: number,
    price: number
};
interface ItemDataProps{
    itemData: itemObject
};
export default function ListItem({itemData}: ItemDataProps){
    return(
        <>
            <Flex justifyContent={"space-between"} h={10} py={2} px={5} borderBottom={"0.5px solid lightgrey"}>
                {itemData.measurement && (
                    <Flex columnGap={5}>
                        <Flex w={"50px"} justifyContent={"right"}>
                            <p>{itemData.serving_amount.toString()}</p>
                        </Flex>
                        <p>{itemData.measurement}</p>
                    </Flex>
                )}

                {itemData.name && <p>{itemData.name}</p>}

                {itemData.cal && <p>{itemData.cal} Calories</p>}
                
                <Flex columnGap={5} alignItems={"centers"}>
                        <AddIcon />
                    </Flex>
            </Flex>
        </>
    )
}