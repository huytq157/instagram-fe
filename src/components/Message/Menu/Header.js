import {Box,Stack,Avatar,Typography} from "@mui/material";
import SearchMessages from "../../../icons/SearchMessages.js"

const Header = ({user}) => {

  return (
    <Box sx={{ p: 2, borderBottom: "1px solid #eee" }}>
      <Stack
        direction="row"
        spacing={1}
        alignItems="center"
        justifyContent="space-between"
      >
        <Stack direction="row" spacing={1} alignItems="center">
          <Avatar src={user?.avatar} alt="" />
          <Typography variant="subtitle2" display="block" gutterBottom>
          {user?.username}
          </Typography>
        </Stack>
        <Box>
          <SearchMessages />
        </Box>
      </Stack>
    </Box>
  )
}

export default Header;