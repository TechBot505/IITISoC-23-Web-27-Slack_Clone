import React, {  useState } from "react";

import { ChatState } from "../context/chatProvider";
import { Box } from "@chakra-ui/react";
import SideDrawer from "../component/chatpagecomp/SideDrawer";
import MyChats from "../component/chatpagecomp/MyChats";
import ChatBox from "../component/chatpagecomp/ChatBox";

const Chatpage = () => {
 const {user} = ChatState();
 const [fetchAgain , setFetchAgain ] = useState(false); 
  return (

<div style={{width : "100%"}}>
  {user && <SideDrawer/>} 
  <Box
  display={
    "flex"
  }
  justifyContent='space-evenly'
  width={"100%"}
  height={"91.5vh"}
  p="10px"
  >
    {user && <MyChats fetchAgain={fetchAgain}/>}
    {user && ( <ChatBox fetchAgain={fetchAgain} setFetchAgain={setFetchAgain} />)}
  </Box>

</div>

  )   ;
};

export default Chatpage;
