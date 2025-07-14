import {Box, Avatar, Stack, Typography }  from "@mui/material";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import useLogout from "../../hook/useLogout";

const AccountProfile = () => {
  const { user } = useContext(AuthContext);
  const { isLoading, handleLogout } = useLogout();

  return (
    <Stack direction="row" spacing={1} alignItems="center">
      <Link to={`/profile/${user?._id}`}>
        <Avatar alt="Remy Sharp" src={user?.avatar} />
      </Link>
      <Box sx={{ flex: 1 }}>
        <Typography variant="button" gutterBottom>
          {user.username}
        </Typography>
        <Typography variant="caption" display="block" gutterBottom>
          {user.fullname}
        </Typography>
      </Box>

      <Typography
        variant="button"
        gutterBottom
        disabled={isLoading}
        onClick={handleLogout}
        color="primary"
        sx={{ cursor: "pointer", fontSize:'13px' }}
      >
        Đăng xuất
      </Typography>
    </Stack>
  );
};

export default AccountProfile;
