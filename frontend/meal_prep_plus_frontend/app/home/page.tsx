"use client"
import { Card, CardHeader, CardBody, CardFooter, Flex, Text } from '@chakra-ui/react'
import NavBar from "../components/navbar"

const links = ["New Ingredient", "New Meal", "New Plan"]
export default function Home(){
    return( 
        <>
        <NavBar />
    <Flex justifyContent="space-evenly">
        {links.map((link: string) => {
            return (
            <Card>
                <CardBody>
                    <Text>{link}</Text>
                </CardBody>
            </Card>)
        })}
    </Flex>
    </>
    )
}