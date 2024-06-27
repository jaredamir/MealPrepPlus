"use client";
import { SmallCloseIcon } from "@chakra-ui/icons";
import { 
    Divider, 
    Editable, 
    EditableInput, 
    EditablePreview, 
    Flex,
    Text 
} from "@chakra-ui/react";
import EditableItem from "../editableItem";

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
interface SectionItemProps {
    sectionData: SectionObject;
};
export default function SectionItem({sectionData}: SectionItemProps){
    return (
        <>
            {sectionData ? (
                <>
                <Flex justifyContent="space-between">
                    <Editable defaultValue={sectionData.name || 'Name'} w={20}>
                        <EditablePreview />
                        <EditableInput />
                    </Editable>

                    <Flex gap={5} alignItems={"centers"}>
                        <a>Hide</a>
                        <SmallCloseIcon />
                    </Flex>
                </Flex>
                <div style={{
                    border: "0.5px solid lightgrey", 
                    borderRadius: "10px", 
                    padding: "10px 0px"
                }}>
                    {sectionData.items && (
                        <>
                            {sectionData.items.map((item: itemObject, index) => {
                                return (
                                    <EditableItem key={sectionData.name + "Item" + index} itemData={item} />
                                );
                            })}

                        </>
                    )}
                </div>
                </>
            ) : (
                <Text>No Data</Text>
            )}
        </>
    );
}