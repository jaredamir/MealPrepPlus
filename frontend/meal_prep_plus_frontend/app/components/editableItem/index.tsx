import { HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons"
import { Input, Flex } from "@chakra-ui/react"

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
export default function EditableItem({itemData}: ItemDataProps){
    return(
        <>
            <Flex justifyContent={"space-between"} h={10} p={2}>
                {itemData.measurement && (
                    <Flex columnGap={5}>
                        <HamburgerIcon />
                        <Input w={4} h={7} placeholder={itemData.serving_amount.toString()}/>
                        <p>{itemData.measurement}</p>
                    </Flex>
                )}

                {itemData.name && <p>{itemData.name}</p>}

                {itemData.cal && <p>{itemData.cal} Calories</p>}
                
                <Flex columnGap={5} alignItems={"centers"}>
                        <a>Hide</a>
                        <SmallCloseIcon />
                    </Flex>
            </Flex>
        </>
    )
}