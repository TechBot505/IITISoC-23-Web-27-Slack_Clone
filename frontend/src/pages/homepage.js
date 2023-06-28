import React, { useEffect } from 'react'
import { Container , Box , Text} from '@chakra-ui/react'
import { Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react'
import Login from '../component/authentication/Login'
import Signup from '../component/authentication/Signup'
import {  useNavigate } from 'react-router-dom'
const Homepage = () => {

const navigate = useNavigate()
  useEffect(()=>{
    const user = JSON.parse(localStorage.getItem("userInfo"));

    if(user) 
      navigate("/chats")
    
  },[navigate])
  return (
    <Container maxW='xl' centerContent>
      <Box
      d="flex"
      justifyContent="center"
      p={3}
      bg={"white"}
      w="100%"
      m= " 40px 0 15px 0"
      borderRadius="lg"
      borderWidth="1px"
      >
        <Text
        fontSize="4xl"
        color={'black'}
        textAlign="center"
        > CHAT APP </Text>
       
      </Box>
      <Box
       d="flex"
       justifyContent="center"
       p={4}
       bg={"white"}
       w="100%"
       m= " 40px 0 15px 0"
       borderRadius="lg"
       borderWidth="1px"  >
        <Tabs variant='soft-rounded' colorScheme='green' color={'black'}>
  <TabList>
    <Tab w={"50%"}>Login</Tab>
    <Tab w={"50%"}>Sign up</Tab>
  </TabList>
  <TabPanels>
    <TabPanel color={'black'}>
      <Login/>
    </TabPanel>
    <TabPanel color={'black'}>
      <Signup/>
    </TabPanel>
  </TabPanels>
</Tabs>    
        
       
      </Box>


    </Container>
  )
}

export default Homepage
