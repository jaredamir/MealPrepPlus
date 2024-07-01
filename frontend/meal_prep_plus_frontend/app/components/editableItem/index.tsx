import { HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons"
import { useState } from "react"
import { Input, Flex } from "@chakra-ui/react"
import itemObject from "@/app/models/itemObject"


interface ItemDataProps{
    itemData: itemObject;
    positionInArray: number;
    removeIngredient: (ingredient: itemObject, positionInArray: number) => void;
    updateIngredientInputAmount: (inputAmount: number | null, positionInArray: number) => void;
};
export default function EditableItem({itemData, 
    positionInArray, 
    removeIngredient, 
    updateIngredientInputAmount
}: ItemDataProps){
    const [amount, setAmount] = useState<number>(itemData.serving_amount)
    const [totalCal, setTotalCal] = useState<number>(itemData.cal)
    const [isInputError, setIsInputError] = useState<boolean>(false)
    const [isHidden, setIsHidden] =useState<boolean>(false)


    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(/^-?\d*\.?\d+$/.test(e.target.value)){
            setIsInputError(false)
            const product = itemData.cal * (Number(e.target.value) / itemData.serving_amount)
            setTotalCal(product)
            setAmount(Number(e.target.value))
            updateIngredientInputAmount(Number(e.target.value), positionInArray)
        }else{
            setIsInputError(true)
            setTotalCal(itemData.cal)
            setAmount(itemData.serving_amount)
            updateIngredientInputAmount(null, positionInArray)
        }
    }
    return(
        <>
            <Flex justifyContent={"space-between"} h={10} p={2} bg={isHidden ? "lightgrey" : "none"}>
                {itemData.measurement && (
                    <Flex columnGap={5}>
                        <HamburgerIcon />
                        <input 
                            type="number"
                            style={{
                                width: "50px",
                                height: "30px",
                                border: "1px solid",
                                borderColor: isInputError ? "red" : "lightgrey",
                                borderRadius: "5px",
                                color: "black",
                                padding: "2px"
                            }}
                            placeholder={itemData.serving_amount.toString()}
                            onChange={handleInput}
                        />
                        <p>{itemData.measurement}</p>
                    </Flex>
                )}

                {itemData.name && <p>{itemData.name}</p>}

                {itemData.cal && <p>{totalCal} Calories</p>}
                
                <Flex columnGap={5} alignItems={"centers"}>
                        <a 
                            style={{cursor: "pointer"}}
                            onClick={() => {setIsHidden(!isHidden)}}
                        >
                            {isHidden ? "Show" : "Hide"}
                        </a>
                        <SmallCloseIcon 
                            style={{cursor: "pointer"}} 
                            onClick={()=>{removeIngredient(itemData, positionInArray)}}
                        />
                    </Flex>
            </Flex>
        </>
    )
}