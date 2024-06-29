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
import SectionObject from "@/app/models/sectionObject";
import itemObject from "@/app/models/itemObject";


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
                                    <EditableItem 
                                        key={sectionData.name + "Item" + index} 
                                        itemData={item} 
                                        positionInArray={index}
                                    />
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