import React, { useState } from "react";
import axios from 'axios'

import {
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  VStack,
  useToast,

} from "@chakra-ui/react";
import { Navigate, useNavigate } from "react-router-dom";

const Login = () => {
  const [show, setShow] = useState(false);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const toast = useToast();
  const [picLoading, setPicLoading] = useState(false);
  const navigate =  useNavigate()



  const handleClick = () => setShow(!show);
  const submitHandler = async() =>{
    setPicLoading(true);
    if(!email || !password){
      toast({
        title: "Please fill all the fields",
        status: "warning",
        duration: 5000,
        isClosable: true,
        position: "bottom",
      });
      setPicLoading(false);
      return;
    }
    try{
      const config ={
        headers : {
          "Content-type" : "application/json",


        },
      };
      const {data } = await axios.post("/api/user/login", {email,password}, config);
      toast({
        title: "Login Successful",
        status: "success",
        duration: 5000,
        isClosable: true,
        position: "top",
      });
      localStorage.setItem('userInfo', JSON.stringify(data));
      setPicLoading(false);
      navigate("/chats")
  } catch (error) {
    toast({
      title: "ERROR",
      description : error.response.data.message ,
      status: "error",
      duration: 5000,
      isClosable: true,
      position: "bottom",
    });
    setPicLoading(false);
    
  }}

  return (
    <VStack spacing={"5px"} color={"black"}>


      <FormControl id="first-name">
        <FormLabel>email</FormLabel>
        <Input
        value={email}
          placeholder=" enter your email "
          onChange={(e) => setEmail(e.target.value)}
        />
      </FormControl>
      <FormControl id="password">
        <FormLabel>Password</FormLabel>
        <InputGroup>
          <Input
                  value={password }

            type={show ? "text" : "password"}
            placeholder=" enter password "
            onChange={(e) => setPassword(e.target.value)}
          />
          <InputRightElement  width={"3rem"}>
            <Button onClick={handleClick}>
              {show ? "Hide" : "Show"}
            </Button>
          </InputRightElement>
        </InputGroup>
      </FormControl>
    

   
        <Button 
        bg="#2f4f4f"
        color={"white"}   
        width={"100%"}
        style={{marginTop : 15}}
        onClick={submitHandler}
        is Loading = {picLoading}
        >
            Login 
        </Button>
        <Button 
        bg="#2f4f4f"
        color={"white"}   
        width={"100%"}
        style={{marginTop : 15}}
        onClick={() => {
          setEmail("guest@example.com")
          setPassword("12345678")
        }}
        >
           Get Credentials for guest login
        </Button>
    </VStack>
  )
}

export default Login
