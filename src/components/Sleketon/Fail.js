import { Box, Avatar } from "@mui/material";

const Fail = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center"}}>
      <Avatar
        sx={{ width: "100px", height: "100px" , borderRadius:"0px"}}
        src="https://cdn-icons-png.flaticon.com/128/3011/3011989.png"
      />
    </Box>
  );
};

export default Fail;
