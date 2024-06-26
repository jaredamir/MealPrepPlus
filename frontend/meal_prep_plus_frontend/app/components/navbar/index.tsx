"use client"
import { Flex,
    Button,
    Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  useDisclosure
 } from '@chakra-ui/react'
 import NavContent from './navContent'
import { HamburgerIcon } from '@chakra-ui/icons'

export default function Navbar(){
    const { isOpen, onOpen, onClose } = useDisclosure()
    return(
        <>
    <Flex justifyContent={"space-between"} py={5}>
        <div>
            <Button onClick={onOpen}>
            <HamburgerIcon />
            </Button>
        </div>
        <h1>MealPrepPlus</h1>
        <div>
            <p>Account</p>
        </div>
    </Flex>
    <Drawer
        isOpen={isOpen}
        placement='left'
        onClose={onClose}
    >
        <DrawerOverlay />
        <DrawerContent>
        <DrawerCloseButton />

        <DrawerBody>
            <NavContent />
        </DrawerBody>

        </DrawerContent>
    </Drawer>
  </>
    )
}