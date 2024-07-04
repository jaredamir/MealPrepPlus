"use client";
import { 
    Flex, 
    Editable, 
    EditablePreview, 
    EditableInput, 
    Divider, 
    Button, 
    Stat, 
    StatLabel, 
    StatNumber, 
    StatHelpText, 
    StatArrow, 
} from "@chakra-ui/react";
import Navbar from "../components/navbar";
import UserObject from "../models/userObject";
import { useState } from "react";
import { TEST_USER_DATA } from "../utils/constants";
import SectionObject from "../models/sectionObject";
import variableItemObject from "../models/variableItemObject";
import ListEditableItem from "../components/listEditableItem";
import itemObject from "../models/itemObject";
import ListSectionItem from "../components/listSectionItem";


export default function NewPlan(){
    const [user, setUser] = useState<UserObject>(TEST_USER_DATA)
    const [meals, setMeals] = useState<variableItemObject[]>([])

    function addMeal(item: variableItemObject){
        setMeals(prevMeals => [...prevMeals, item])
    }

    function updateMealData(data: variableItemObject, positionInArray: number){
        const updatedMeals = meals.map((meal: variableItemObject, index) => {
            if (index === positionInArray){
                return {...data}
            }
            return meal
        })
        setMeals(updatedMeals)
    }

    function updateMealInputAmount(inputAmount: number | null, positionInArray: number){
        console.log("called parent")
        const updatedMeals = meals.map((meal: variableItemObject, index) => {
            if (index === positionInArray){
                return {...meal, inputAmount: inputAmount}
            }
            return meal
        })
        setMeals(updatedMeals)
    }

    function removeMeal(meal: variableItemObject, positionInArray: number){
        setMeals(prevArr => prevArr.filter((meal, index) => index !== positionInArray))
    }

    function calcTotalCalories(){
        var totalCalories = 0;
        meals.forEach((meal: variableItemObject) => {
            var totalCaloriesInMeal = 0
            meal.items.forEach((ingredient: itemObject) => {
                if(ingredient.inputAmount){
                    totalCaloriesInMeal += ingredient.cal * (ingredient.inputAmount / ingredient.serving_amount);
                }else{
                    totalCaloriesInMeal += ingredient.cal;
                }
            })
            if(meal.inputAmount && meal.inputAmount !== null){
                totalCalories += (totalCaloriesInMeal * meal.inputAmount);
            }else{
                totalCalories += totalCaloriesInMeal;
            }
        })
        return totalCalories;
    }
    return (
        <>
            <Navbar />
            <main style={{padding: "50px", position: "relative", paddingBottom: "100px"}}>
                <Flex mb={2} gap={3}>
                    <a>Your meals</a>
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
                    mb={10}
                >
                    { user && user.meals && (
                        user.meals.map((meal: SectionObject) => {
                            return (<ListSectionItem 
                                        itemData={meal}
                                        addItem={addMeal}
                            />)
                        })
                    )

                    }
                </Flex>

                <Flex justifyContent={"space-between"}>
                    <Editable defaultValue='Plan name*' minW={100}>
                        {/*bug: uneditable when empty*/}
                        <EditablePreview /> 
                        <EditableInput />
                    </Editable>

                </Flex>
                <Divider my={2} />
                
                <div style={{paddingLeft: "50px", marginBottom: "20px"}}>
                    { meals.length > 0 ? 
                        (meals.map((meal: variableItemObject, index) => (
                            <ListEditableItem 
                                key={'meal' + index} 
                                positionInArray={index} 
                                itemData={meal}
                                removeItem={removeMeal}
                                updateInputAmount={updateMealInputAmount}
                                updateData={updateMealData}
                            />
                        )) 
                    ) : 
                        <p style={{color: "grey", margin: "20px 0px"}}>Add meals to this plan</p>
                    }
                </div>
                
                <Flex justifyContent={"right"} gap={3}>
                    <Button>Cancel</Button>
                    <Button colorScheme="blue">Save</Button>
                </Flex>
                
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
    )
}