import { 
    Modal, 
    ModalOverlay, 
    ModalContent, 
    ModalHeader, 
    ModalCloseButton, 
    ModalBody, 
    ModalFooter, 
    Button,
    useDisclosure,
    Editable,
    EditableInput,
    EditablePreview,
    Select,
    Flex,
    Input,
} from "@chakra-ui/react";
import { MEASUREMENTS } from "@/app/utils/constants";
import { useState } from "react";
import itemObject from "@/app/models/itemObject";

interface NewItemModalProps {
    isNewItemModalOpen: any;
    onNewItemModalOpen: any;
    onNewItemModalClose: any;
    storeNewItem?: (item: itemObject) => void;
}

export default function NewItemModal({
    isNewItemModalOpen, 
    onNewItemModalClose,
    onNewItemModalOpen,
    storeNewItem
}: NewItemModalProps){
    const [name, setName] = useState<string>()
    const [servingSize, setServingSize] = useState<number>()
    const [measurement, setMeasurement] = useState<string>(MEASUREMENTS[0])
    const [calories, setCalories] = useState<number>()
    const [protein, setProtein] = useState<number>()
    const [carbs, setCarbs] = useState<number>()
    const [fats, setFats] = useState<number>()
    const [sugar, setSugar] = useState<number>()
    const [price, setPrice] = useState<number>()

    const isValid = () => {
        return (
            (!name || name === '') ||
            (!servingSize || servingSize === 0) ||
            (!calories || calories === 0)
        );
    }

    const submitAddItem = () =>{
            const newItemObject = {
                name: name,
                serving_amount: servingSize,
                measurement: measurement,
                cal: calories,
                pro: protein,
                carb: carbs,
                fats: fats,
                sugar: sugar,
                price: price,
            }
            if(storeNewItem){
                storeNewItem(newItemObject)
            }
            onNewItemModalClose()
    }
    return (
        <Modal isOpen={isNewItemModalOpen} onClose={onNewItemModalClose} closeOnOverlayClick={false}>
            <ModalOverlay />
                <ModalContent p={5} borderRadius={20}>
                <ModalCloseButton />
                <ModalBody>
                    <Editable fontSize={18} defaultValue={"Name*"} mb={5}>
                        <EditablePreview />
                        <EditableInput onChange={(e) => setName(e.target.value)}/>
                    </Editable>
                    <p style={{color: "grey", marginBottom: "10px"}}>info per serving</p>
                    <form>
                        <Flex justifyContent="space-between" gap={2}>
                            <Input type="number" placeholder={"Serving size*"} 
                                onChange={(e) => setServingSize(Number(e.target.value))}
                            />
                            <Select onChange={(e) => setMeasurement(e.target.value)}>
                                { MEASUREMENTS.map((measurement: string, index) => {
                                    return (<option 
                                            key={"measurementOption" + index} 
                                            value={'option'+(index+1)}
                                            >
                                                {measurement}
                                            </option>)
                                    })
                                }
                            </Select>
                        </Flex>
                        <Input type="number" placeholder={"Calories*"} onChange={(e) => setCalories(Number(e.target.value))}/>
                        <Input type="number" placeholder={"Protein"} onChange={(e) => setProtein(Number(e.target.value))}/>
                        <Input type="number" placeholder={"Carbs"} onChange={(e) => setCarbs(Number(e.target.value))}/>
                        <Input type="number" placeholder={"Fats"} onChange={(e) => setFats(Number(e.target.value))}/>
                        <Input type="number" placeholder={"Sugar"} onChange={(e) => setSugar(Number(e.target.value))}/>
                        <Input type="number" placeholder={"Price"} onChange={(e) => setPrice(Number(e.target.value))}/>
                    </form>
                    <Flex justifyContent={"right"} my={1}>
                        <p 
                            style={{color: "grey", fontSize: "15px", cursor: "pointer"}}
                        >
                            clear
                        </p>
                    </Flex>

                </ModalBody>

                <ModalFooter>
                    <Button variant='ghost' mr={3} onClick={onNewItemModalClose}>
                    Cancel
                    </Button>
                    <Button 
                        colorScheme='blue'
                        isDisabled={isValid()}
                        onClick={submitAddItem}
                    >
                        Save
                    </Button>
                </ModalFooter>
            </ModalContent>
        </Modal>
    )
}