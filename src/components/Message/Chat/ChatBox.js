import { Box } from "@mui/material";
import { UserContext } from "../../../context/UserProvider";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "../../../context/AuthContext";
import { getConversation } from "../../../services/messages";
import Messages from "./Messages";
import ChatHeader from "./ChatHeader";

const ChatBox = () => {
  const { person } = useContext(UserContext)
  const { user } = useContext(AuthContext)

  const [conversation, setConversation] = useState({});

  useEffect(() => {
    const getConversationDetails = async () => {
      let data = await getConversation({ senderId: user?._id, receiverId: person?.user?._id });
      setConversation(data);
    }
    getConversationDetails();
  }, [person?.user?._id]);


  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        flexDirection: "column",
        width: "100%",
        height: "100%",
      }}
    >
      <ChatHeader person={person} />
      <Messages person={person} conversation={conversation} />
    </Box>
  )
}

export default ChatBox;