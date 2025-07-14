import { Link } from "react-router-dom";

import { Avatar, Stack, Box, Typography } from "@mui/material";

const SearchAccountItem = ({ account }) => {
  return (
    <Box component={Link} to={`/profile/${account?._id}`} sx={{textDecoration:"none", color:"#000"}}>
      <Stack direction="row" alignItems="center" spacing={1}>
        <Avatar alt="Remy Sharp" src={account?.avatar} />
        <Box>
          <Typography variant="subtitle2" >
            {account?.username}
          </Typography>
          <Typography variant="body2" >
            {account?.fullname}
          </Typography>
        </Box>
      </Stack>
    </Box>
  );
};

export default SearchAccountItem;
