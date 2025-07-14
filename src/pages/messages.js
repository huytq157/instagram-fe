import {Box,Grid} from "@mui/material";
import {useContext } from "react";
import { UserContext } from "../context/UserProvider";
import Menu from "../components/Message/Menu/menu";
import ChatBox from "../components/Message/Chat/ChatBox";

const Messages = () => {
  const { person } = useContext(UserContext)

  return (
    <Box
      sx={{
        width: "95%",
        height: "95%",
        background: "#f3f6f9",
        border: "1px solid #eee",
        margin: "20px auto",
        borderRadius: "5px",
      }}
    >
      <Grid container spacing={2} sx={{ height: "100%" }}>
        <Grid item xs={4} sx={{ height: "100%" }}>
          <Menu />
        </Grid>

        <Grid item xs={8} sx={{ height: "100%" }}>
          {Object.keys(person).length ? <ChatBox /> : <Box sx={{display:'flex', justifyContent:"center",mt: 30}}>Không có tin nhắn</Box>}
        </Grid>
      </Grid>
    </Box>
  );
};

export default Messages;
