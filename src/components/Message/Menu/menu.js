import { Box } from "@mui/material";
import Header from "./Header.js";
import { useContext, useState } from "react";
import Conversations from "./Conversations.js";
import { AuthContext } from "../../../context/AuthContext.js";

const Menu = () => {
  const [text, setText] = useState('');
  const {user} = useContext(AuthContext)

  return (
    <Box sx={{ height: "100%", borderRight: "1px solid #eee" }}>
      <Header user={user}/>
      <Box sx={{ height: "100%", m: 1 }}>
        <Conversations text={text} setText={setText}/>
      </Box>
    </Box>
  )
}

export default Menu;