import { AddIcon, HamburgerIcon, SmallCloseIcon } from "@chakra-ui/icons"
import { useState, useEffect } from "react"
import { Input, Flex, Accordion, AccordionButton, AccordionIcon, AccordionItem, AccordionPanel, Box, EditableInput, Divider } from "@chakra-ui/react"
import itemObject from "@/app/models/itemObject"
import variableItemObject from "@/app/models/variableItemObject";
import EditableItem from "../editableItem";


interface ItemDataProps{
    itemData: variableItemObject;
    positionInArray: number;
    removeItem?: (meal: variableItemObject, positionInArray: number) => void;
    updateInputAmount?: (inputAmount: number | null, positionInArray: number) => void;
    updateData: (data: variableItemObject, positionInArray: number) => void;
};
export default function ListEditableItem({
    itemData,
    removeItem,
    positionInArray,
    updateInputAmount,
    updateData
}: ItemDataProps){
    const [data, setData] = useState<variableItemObject>(itemData)
    const [amount, setAmount] = useState<number>(1)
    const [isInputError, setIsInputError] = useState<boolean>(false)
    const [isHidden, setIsHidden] = useState<boolean>(false)


    useEffect(() => {
        updateData(data, positionInArray);
    }, [data]);

    function calcTotalCalories(){
        var totalCalories = 0;
        data.items.forEach((ingredient: itemObject) => {
            if(ingredient.inputAmount){
                totalCalories += ingredient.cal * (ingredient.inputAmount / ingredient.serving_amount)    
            }else{
                totalCalories += ingredient.cal
            }
        })
        
        return totalCalories * amount;
    }

    function removeIngredient(ingredient: itemObject, positionInArray: number){
        setData((prevData) => {
            const updatedItems = prevData.items.filter((_, index) => index !== positionInArray);
            return { ...prevData, items: updatedItems };
        });
    };
    function updateIngredientInputAmount(inputAmount: number | null, positionInArray: number){
        const updatedItems = data.items.map((ingredient: itemObject, index) => {
            if (index === positionInArray){
                return {...ingredient, inputAmount: inputAmount}
            }
            return ingredient
        })
        setData(prevArr => {return {...prevArr, items: updatedItems}})
    };
    function updateHiddenStateIngredient(hiddenState: boolean, positionInArray: number){
        const updatedItems = data.items.map((ingredient: itemObject, index) => {
            if (index === positionInArray){
                return {...ingredient, isHidden: hiddenState}
            }
            return ingredient
        })
        setData(prevArr => {return {...prevArr, items: updatedItems}})
    };

    function remove(){
        if(removeItem){
            removeItem(itemData, positionInArray)
        }
    }

    const handleInput = (e: React.ChangeEvent<HTMLInputElement>) => {
        if(updateInputAmount){
            if(/^-?\d*\.?\d+$/.test(e.target.value)){
                setIsInputError(false)
                setAmount(Number(e.target.value))
                updateInputAmount(Number(e.target.value), positionInArray)
            }else{
                if(e.target.value === ''){
                    setIsInputError(false)
                } else{
                    setIsInputError(true)
                }
                setAmount(1)
                updateInputAmount(1, positionInArray)
            }
        }
    }

    return (
            <Accordion defaultIndex={[1]} allowMultiple>
                <AccordionItem>
                    <AccordionButton w={"100%"}>
                    <Flex justifyContent={"space-between"} w={"100%"} gap={10}>
                        <Flex gap={2}>
                            {updateInputAmount && (<input 
                                type="number"
                                style={{
                                    width: "40px",
                                    height: "30px",
                                    border: "1px solid",
                                    borderColor: isInputError ? "red" : "lightgrey",
                                    borderRadius: "5px",
                                    color: "black",
                                    padding: "2px"
                                }}
                                placeholder={"1"}
                                onChange={handleInput}
                            />)}
                            {data.name && (data.name)}
                            <AccordionIcon />
                        </Flex>
                        {calcTotalCalories() + " calories "}
                        {removeItem && (
                            <SmallCloseIcon 
                                style={{cursor: "pointer"}} 
                                onClick={()=>{remove()}}
                            />)
                        }
                    </Flex>
                    </AccordionButton>
                        
                    <AccordionPanel pb={4} style={{paddingLeft: "30px"}}>
                        <p style={{fontWeight: 600}}>Ingredients</p>
                        <Divider mb={3}/>
                        {data.items && (
                            data.items.map((ingredient: itemObject, index) => {
                                return (<EditableItem
                                            itemData={ingredient}
                                            positionInArray={index}
                                            removeIngredient={removeIngredient}
                                            updateHiddenStateIngredient={updateHiddenStateIngredient}
                                            updateIngredientInputAmount={updateIngredientInputAmount}
                                            inputAmount={ingredient.inputAmount ? ingredient.inputAmount : undefined}
                                        />)
                            })
                        )}
                    </AccordionPanel>
                </AccordionItem>
            </Accordion>
            
        
    );
}
   