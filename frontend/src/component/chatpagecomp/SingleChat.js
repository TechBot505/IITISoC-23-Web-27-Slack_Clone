import React, { useEffect, useState } from 'react'
import { ChatState } from '../../context/chatProvider'
import { Box,FormControl,IconButton,Input,Spinner,Text, useToast  } from '@chakra-ui/react';
import { ArrowBackIcon } from '@chakra-ui/icons';
import { getSender, getSenderFull } from '../../config2/ChatLogic';
import ProfileModal from './profileModel';
import UpdateGroupChatModal from './UpdateGroupChatModal';
import axios from 'axios';
import './styles.css'
import ScrollableChat from './ScrollableChat';

const SingleChat = ({fetchAgain, setFetchAgain}) => {
    const [messages, setMessages] = useState([])
    const [loading, setLoading] = useState(false)
    const [newMessage, setNewMessage] = useState("")
    const toast = useToast()

    const { user, selectedChat, setSelectedChat} = ChatState();
    const typingHandler =(e)=>{
      setNewMessage(e.target.value)

  }
  const fetchMessages = async () => {
    if (!selectedChat) return;

    try {
      const config = {
        headers: {
          Authorization: `Bearer ${user.token}`,
        },
      };

      setLoading(true);

       const { data } = await axios.get(
        `/api/message/${selectedChat._id}`,
        config
      );
     

          console.log(messages)
      setMessages(data);
      console.log(data)
      
      setLoading(false);

      // socket.emit("join chat", selectedChat._id);
    } catch (error) {
      toast({
        title: "Error Occured!",
        description: "Failed to Load the Messages",
        status: "error",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
    }
  };
  
  
    const sendMessages = async (event) => {
        if (event.key === "Enter" && newMessage) { 
        //  
          try {
            const config = {
              headers: {
                "Content-Type": "application/json",
                Authorization: `Bearer ${user.token}`,
              },
            };
                
           
            setNewMessage("");
            const  {data}  = await axios.post(
              "/api/message/",
              {
                content: newMessage,
                chatId: selectedChat,
              },config
              
            );
            // socket.emit("new message", data);
           
            
            
            setMessages([...messages, data]);
          } catch (error) {
            toast({
              title: "Error Occured!",
              description: "Failed to send the Message",
              status: "error",
              duration: 5000,
              isClosable: true,
              position: "bottom",
            });
          }
        }
      };
      useEffect(() => {
        fetchMessages();
    
        
      },[selectedChat]);
   
  return( <>{
    selectedChat? (
        <>
        <Text
        fontSize={{base: "28px" , md : "30px"}}
        pb={3}
        px={2}
        w={"100%"}
        display={"flex"}
        justifyContent={{base : "space-between"}}
        alignItems={"center"}

        >
            <IconButton
            display={{base : " flex" , md  : "none"}}
            icon={<ArrowBackIcon/>}
            onClick={()=>setSelectedChat("")}
             

            />
              {messages &&
              (!selectedChat.isGroupChat) ? (
                <>
                  {getSender(user, selectedChat.users)}
                  <ProfileModal
                    user={getSenderFull(user, selectedChat.users)}
                  />
                </> 
            ) : (<>

            {selectedChat.chatName.toUpperCase()}
            <UpdateGroupChatModal fetchAgain={fetchAgain}
            setFetchAgain={setFetchAgain}
            fetchMessages={fetchMessages}
            />
            </>)}
                
            


        </Text>
        <Box
        display="flex"   
        flexDir="column"     
        justifyContent="flex-end"
        p={3}       
        bg={"#E8E8E8"}
        w="100%"
        height="100%"
        borderRadius="lg"
        overflowY={"hidden"}
        >

                {loading? ( <Spinner
                    size={"xl"}
                    w={20}
                    h={20}
                    alignSelf={"center"}
                    margin={"auto"}
                    />)
                    : (<div className='messages'>

                      <ScrollableChat  messages={messages}/>
                    </div>)
                }
            <FormControl 
            onKeyDown={sendMessages} 
            id="first-name" 
            isRequired mt={3}
            
            >
                <Input
                variant={"filled"}
                placeholder='Type your message here' 
                bg={"#E0E0E0 "}
                onChange={typingHandler}
                value={newMessage}

                />
                

            </FormControl>
        </Box>
        
        </>
    ): (
        <Box display="flex " alignItems="center" justifyContent="center" h={"100%"} > 
            <Text fontSize={"3xl"} pb={3 } >
                Click on a user to start chatting
            </Text>
        </Box>

    )}
  </>
  )
}

export default SingleChat
