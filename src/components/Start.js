import Stack from "@mui/material/Stack";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";

const StartLoader = () => {
  return (
    <Box sx={{ width: "100%", height: "100vh", background: "#000" }}>
      <Stack
        direction="row"
        justifyContent="center"
        alignItems="center"
        spacing={2}
        sx={{ width: "100%", height: "100vh"}}
      >
        <Avatar alt="Remy Sharp" src="../images/logo-gradient.png" sx={{width: 100, height:100}}/>
      </Stack>
    </Box>
  );
};

export default StartLoader;
