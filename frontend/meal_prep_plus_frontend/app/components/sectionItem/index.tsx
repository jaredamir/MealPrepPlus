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
                    <Editable defaultValue={sectionData.name === '' ? 'Section name' : sectionData.name} w={30}>
                        <EditablePreview />
                        <EditableInput w={30}/>
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
                            { sectionData.items.length > 0 ?
                            (sectionData.items.map((item: itemObject, index) => {
                                return (
                                    <EditableItem 
                                        key={sectionData.name + "Item" + index} 
                                        itemData={item} 
                                        positionInArray={index}
                                    />
                                );
                                })
                                )
                                : <p>Add ingredients to this section</p>
                            }

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