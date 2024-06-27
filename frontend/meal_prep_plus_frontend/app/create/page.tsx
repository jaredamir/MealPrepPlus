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
} from "@chakra-ui/react"
import Navbar from "../components/navbar";
import { AddIcon } from "@chakra-ui/icons";
import SectionItem from "../components/sectionItem";

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

interface SectionObject {
    name: string;
    items: itemObject[];
}

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
export default function Create(){
    const [sections, setSections] = useState<SectionObject[]>([defaultSection])

    const calcTotalCalories = function(){
        let totalCalories = 0;
        sections.forEach((section: SectionObject) =>{
            let totalCaloriesInSection = 0;
            section.items.forEach((item: itemObject) => {
                totalCaloriesInSection += item.cal;
            })
            totalCalories += totalCaloriesInSection; 
        });
        return totalCalories;
    }
    return(
        <>
            <Navbar />
            <main style={{padding: "50px"}}>
                <Flex 
                    maxH={"200px"} 
                    overflowY={"auto"} 
                    flexDir={"column"}
                    border={"1px solid lightgrey"}
                    borderRadius={10}
                    w={"100%"}
                >
                    <p>Ingredient</p>
                    <p>Ingredient</p>
                    <p>Ingredient</p>
                    <p>Ingredient</p>
                    <p>Ingredient</p>
                    

                </Flex>
                <Button color="grey" textDecoration="none" border={"none"} bg={"none"} mb={5}>
                    <AddIcon /> add
                </Button>

                <Flex justifyContent={"space-between"}>
                    <Editable defaultValue='Name' minW={100}>
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
                    {sections.map((section: SectionObject, index) => {
                        return (
                            <SectionItem key={"sectionItem"+index} sectionData={section} />
                        )
                    })}
                </div>
                <Flex justifyContent={"center"} mb={7}>
                    <Button>
                        <AddIcon/> 
                        Add Section
                    </Button>
                </Flex>
                <Flex justifyContent={"space-evenly"}>
                    <Card>
                        <CardBody p={10}>
                            <Flex flexDir={"column"} alignItems={"center"}>
                                <h1>{calcTotalCalories()}</h1>
                                <h1>Total Calories</h1>
                            </Flex>
                        </CardBody>
                    </Card>
                </Flex>
            </main>
        </>
    );
}