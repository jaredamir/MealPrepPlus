"use client";
import { useState } from "react";
import { 
    Flex, 
    Divider,
    Editable,
    EditablePreview,
    EditableInput,
    Select,
    Button,
    Card,
    CardBody,
    Stat,
    StatArrow,
    StatHelpText,
    StatLabel,
    StatNumber,
    useDisclosure,
} from "@chakra-ui/react"
import Navbar from "../components/navbar";
import { AddIcon } from "@chakra-ui/icons";
import SectionItem from "../components/sectionItem";
import ListItem from "../components/listItem";
import { TEST_USER_DATA } from "../utils/constants";
import itemObject from "../models/itemObject";
import SectionObject from "../models/sectionObject";
import UserObject from "../models/userObject";
import EditableItem from "../components/editableItem";
import NewItemModal from "../components/newItemModal";

const categoryOptions = ["Breakfast", "Lunch", "Dinner", "Snack"]
const defaultSection = {
    name: "name",
    items: [
        {
            name: "tomato",
            serving_amount: 1,
            measurement: "item(s)",
            cal: 20,
            pro: 1,
            carb: 5,
            fats: 0,
            sugar: 10,
            price: 1.50
        },
        {
            name: "Lettuce",
            serving_amount: 10,
            measurement: "grams",
            cal: 10,
            pro: 1,
            carb: 1,
            fats: 0,
            sugar: 2,
            price: 0.50
        }
    ],
}
const EmptySectionItem = {
    name: '',
    items: [],
}

export default function Create(){
    //const [sections, setSections] = useState<SectionObject[]>([EmptySectionItem])
    const [ingredients, setIngredients] = useState<itemObject[]>([])
    const [user, setUser] = useState<UserObject>(TEST_USER_DATA)

    function addIngredient(ingredient: itemObject){
        setIngredients(prevArr => [...prevArr, ingredient])
    }

    function removeIngredient(ingredient: itemObject, positionInArray: number){
        setIngredients(prevArr => prevArr.filter((ingredient, index) => index !== positionInArray))
    }

    function updateHiddenStateIngredient(hiddenState: boolean, positionInArray: number){
        const updatedIngredients = ingredients.map((ingredient: itemObject, index) => {
            if (index === positionInArray){
                return {...ingredient, isHidden: hiddenState}
            }
            return ingredient
        })
        setIngredients(updatedIngredients)
    }
    
    function updateIngredientInputAmount(inputAmount: number | null, positionInArray: number){
        const updatedIngredients = ingredients.map((ingredient: itemObject, index) => {
            if (index === positionInArray){
                return {...ingredient, inputAmount: inputAmount}
            }
            return ingredient
        })
        setIngredients(updatedIngredients)
    }

    function storeNewItem(item: itemObject){
        const updatedIngredientsList = [...user.ingredients, item]
        const updatedUser = { ...user, ingredients: updatedIngredientsList}
        setUser(updatedUser)
    }

    const calcTotalCalories = function(){
        let totalCalories = 0;
        ingredients.forEach((ingredient: itemObject) => {
            if(!ingredient.isHidden || !ingredient.isHidden === null){
                if(ingredient.inputAmount){
                totalCalories += ingredient.cal * (ingredient.inputAmount / ingredient.serving_amount)
            } else{
                totalCalories += ingredient.cal
            }}
        })
        /*
        sections.forEach((section: SectionObject) =>{
            let totalCaloriesInSection = 0;
            section?.items?.forEach((item: itemObject) => {
                totalCaloriesInSection += item.cal;
            })
            totalCalories += totalCaloriesInSection; 
        });
        */
        return totalCalories;
    }

    /*
    function addSection() {
        setSections(prevArray => [...prevArray, EmptySectionItem])
    }*/

        const { 
            isOpen: isNewItemModalOpen, 
            onOpen: onNewItemModalOpen, 
            onClose: onNewItemModalClose } = useDisclosure()
    return(
        <>
            <Navbar />
            <main style={{padding: "50px", position: "relative", paddingBottom: "100px"}}>
                <NewItemModal 
                    isNewItemModalOpen={isNewItemModalOpen}
                    onNewItemModalOpen={onNewItemModalOpen} 
                    onNewItemModalClose={onNewItemModalClose}
                    storeNewItem={storeNewItem}
                />
                <Flex mb={2} gap={3}>
                    <a>Your Ingredients</a>
                    <a>Community</a>
                </Flex>
                <Flex 
                    maxH={"200px"} 
                    p={1}
                    overflowY={"auto"} 
                    flexDir={"column"}
                    border={"1px solid lightgrey"}
                    borderRadius={10}
                    w={"100%"}
                >
                    {user && user.ingredients ? (
                        user.ingredients.map((ingredient: itemObject, index) => {
                           return (<ListItem 
                                        key={"ingredient"+index} 
                                        itemData={ingredient} 
                                        addIngredient={addIngredient}
                                        
                                    />
                                )
                        })
                    )
                    : <p>No ingredients available, add some new ones</p>
                    }
                </Flex>
                <Button 
                    color="grey" 
                    textDecoration="none" 
                    border={"none"} 
                    bg={"none"} 
                    mb={5}
                    onClick={onNewItemModalOpen}
                >
                    <AddIcon mx={2}/> Create new ingredient
                </Button>

                <Flex justifyContent={"space-between"}>
                    <Editable defaultValue='Meal name*' minW={100}>
                        {/*bug: uneditable when empty*/}
                        <EditablePreview /> 
                        <EditableInput />
                    </Editable>

                    <Select placeholder='Category' w={200}>
                        {categoryOptions.map((category: string, index) => {
                            return (
                                <option key={category+ "Option" + index} value={'option'+ index}>
                                    {category}
                                </option>
                            )
                        })}
                    </Select>
                </Flex>
                <Divider my={2} />
                <div style={{paddingLeft: "50px", marginBottom: "20px"}}>
                    {ingredients.length > 0 ?
                    (ingredients.map((ingredient: itemObject, index) => {
                        return (
                            <EditableItem 
                                removeIngredient={removeIngredient} 
                                itemData={ingredient} 
                                positionInArray={index} 
                                updateIngredientInputAmount={updateIngredientInputAmount}
                                key={"sectionItem"+index}
                                updateHiddenStateIngredient={updateHiddenStateIngredient}
                            />
                        )
                    }))
                    : <p style={{color: "grey", margin: "20px 0px"}}>Add ingredients to this meal</p>
                }
                </div>
                {/*<div style={{paddingLeft: "50px", marginBottom: "20px"}}>
                    {sections.map((section: SectionObject, index) => {
                        return (
                            <SectionItem key={"sectionItem"+index} sectionData={section} />
                        )
                    })}
                </div>
                <Flex justifyContent={"center"} mb={7}>
                    <Button onClick={() => addSection()}>
                        <AddIcon/> 
                        Add Section
                    </Button>
                </Flex>*/}
                
                <div style={{
                    position: "fixed", 
                    display: "flex", 
                    justifyContent: "space-evenly",
                    backgroundColor: "white",
                    borderTop: "1px solid lightgrey",
                    bottom: "0px", 
                    left: "0px", 
                    width: "100vw",
                    height: "100px",
                    padding: "10px"
                }}>
                    <Stat>
                        <StatLabel>Total Calories</StatLabel>
                        <StatNumber>{calcTotalCalories()}</StatNumber>
                        <StatHelpText>
                        <StatArrow type='increase' />
                        within goal
                        </StatHelpText>
                    </Stat>
                </div>
            </main>
        </>
    );
}