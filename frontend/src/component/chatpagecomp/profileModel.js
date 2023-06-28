import { ViewIcon } from '@chakra-ui/icons'
import { Button, IconButton, Modal, ModalBody, ModalCloseButton, ModalContent, ModalFooter, ModalHeader, ModalOverlay, useDisclosure, Image, Text} from '@chakra-ui/react'
import React from 'react'

const ProfileModal = ({user, children}) => {
    const { isOpen, onOpen, onClose } = useDisclosure ();



  return (<>
   {
    children? ( <span onClick={onOpen}>{children}</span>) : (

        <IconButton
        display={{ base : "flex"}}
        icon = {<ViewIcon/>}
        onClick={onOpen}

        >

        </IconButton>
    )
   }
    <Modal
    size={"lg"}

    isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent
        height={"410px"}
        >
          <ModalHeader
          fontSize={"40px"}
          display={"flex"}
          justifyContent={
            "center"
          }
          >{user.name}</ModalHeader>
          <ModalCloseButton />
          <ModalBody
          display={"flex"}
          flexDir={"column"}
          alignItems={"center"}
          justifyContent={"space-between"}
          >
            <Image
            border={"4px solid "}
            borderRadius ="full"
            boxSize={"150px"}
            src={user.pic}
            alt={user.name}
          


            />
            <Text
            fontSize={"30px"}
            >{user.email}</Text>
        
          </ModalBody>

          <ModalFooter>
            <Button colorScheme='blue' mr={3} onClick={onClose}>
              Close
            </Button>
            {/* <Button variant='ghost'>Secondary Action</Button> */}
          </ModalFooter>
        </ModalContent>
      </Modal>
    </>
    )
}

export default ProfileModal
