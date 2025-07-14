import { Box, Typography } from "@mui/material";

const NoPost = () => {
  return (
    <Box sx={{display:"flex", justifyContent:"center", alignItems:"center", mt:5}}>
      <Typography variant="subtitle1" gutterBottom>
        Không có bài viết
      </Typography>
    </Box>
  );
};

export default NoPost;
