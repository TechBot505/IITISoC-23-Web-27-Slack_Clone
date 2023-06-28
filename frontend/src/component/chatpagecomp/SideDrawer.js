import { Box, Button, Tooltip, Text, Menu, MenuButton, Avatar, MenuItem, MenuList, MenuDivider, useDisclosure, Input, Toast, useToast, Spinner  } from '@chakra-ui/react';
import React, { useState } from 'react'
import { FaSearch } from "react-icons/fa";
import { BellIcon, ChevronDownIcon } from '@chakra-ui/icons'
import { ChatState } from '../../context/chatProvider';
import ProfileModal from './profileModel';
import axios from 'axios'

import { Navigate, useNavigate } from 'react-router-dom';
import {
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
} from '@chakra-ui/react'
import ChatLoading from './ChatLoading';
import UserListItem from './UserListItem';



const SideDrawer = () => {
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  // const btnRef = React.useRef()

  const [search, setSearch] = useState("");
  const [searchResult, setSearchResult] = useState([]);
  const [loading, setLoading] = useState(false);
  const [loadingChat, setLoadingChat] = useState();
  const {user, setSelectedChat, chats, setChats} = ChatState();
  const navigate = useNavigate();

  const logoutHandler =()=>{
    localStorage.removeItem("userInfo")
    navigate("/")
  }
  const handleSearch= async ()=>{
    if(!search){
      toast({
        title: "Please enter something",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "top-left",
      });
      return;
    }
    try {
      setLoading(true);

      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.get(`/api/user?search=${search}`, config);
      setLoading(false); 
      setSearchResult(data);
    } catch (error) {
      Toast({
        title: "Error Occured",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      
    }
  }
  const accessChat = async (userId)=>{
    try {
      setLoadingChat(true)
      const config = {
        headers: {
          "Content-type" : "application/json",
          Authorization: `Bearer ${user.token}`,
        },
      };
      const {data} = await axios.post('api/chat',{userId},config  );
      if (!chats.find((c) => c._id === data._id)) setChats([data, ...chats]);
      setSelectedChat(data);
      setLoadingChat(false);
      onClose();
    } catch (error) {
      toast({
        title: "Error Fetching the chats",
        description : error.message,
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom-left",
      });
      
    }

  }

  return (
<>
    <div>

      <Box
      display={"flex"}
      
      justifyContent="space-between"
      alignContent="center"
      bg={'white'}
      width="100%"
      p= "5px 10px 5px 10px "
      borderWidth="5px"
            >
              
        
        <Tooltip label="search user to chat" hasArrow placement='bottom-end'>
           
           <Button variant={"ghost"} onClick={onOpen}>
           <i> <FaSearch/></i>  
           <Text 
           d={{base:"none", md:"flex"}}
           px= "4"
           >Search User</Text>
           </Button>
        </Tooltip>

        <Text>
          CHatAPP
        </Text>
        <div>
          <Menu>
            <MenuButton
           
            p={1}
            >
               <BellIcon fontSize={"2xl"} m={1}/>

               {/* <MenuList>

               </MenuList> */}

            </MenuButton>
          </Menu>
          <Menu>
          <MenuButton
            as={Button}
            rightIcon={<ChevronDownIcon/>} 
            p={1}
            >
              <Avatar size= "sm" cursor={"pointer"} name={user.name} src={user.pic} ></Avatar>

            </MenuButton>
            <MenuList>
              <ProfileModal user={user}>
              <MenuItem>My Profile</MenuItem>
              </ProfileModal>
              <MenuDivider/>
              <MenuItem onClick={ logoutHandler  }>Log out</MenuItem>
            </MenuList>
          </Menu>
        </div>
      </Box>
    <Drawer placement='left' onClose={onClose} isOpen={isOpen}>
        <DrawerOverlay>
          <DrawerContent>
            <DrawerHeader borderBottomWidth={"2px"}>
              search users
            </DrawerHeader>
            <DrawerBody>
          <Box 
          display={"flex"}
          pb={
            2
          }
          >
            <Input
            placeholder='search by name or email'
            mr={2}
            value={search}
            onChange={(e)=> setSearch(e.target.value)}
            />
           
            <Button
             onClick={handleSearch}
             >Go</Button>

          </Box>
          {loading ? (
              <ChatLoading />
            ) : ( 
              searchResult?.map((user) => (
                <UserListItem
                  key={user._id}
                  user={user}
                  handleFunction={() => accessChat(user._id)}
                />
              ))
            )}
            {loadingChat && <Spinner ml={"auto"} d="flex"/>}
        
        </DrawerBody>
          </DrawerContent>
        </DrawerOverlay>
     
    </Drawer>
    </div>
    </>
  )
}

export default SideDrawer
