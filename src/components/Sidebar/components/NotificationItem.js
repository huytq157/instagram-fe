import { Typography, Stack, Avatar } from "@mui/material";
import { useNavigate } from "react-router-dom";
import calculateCreatedTime from "../../../utils/formatDate";

const NotificationItem = ({ notification }) => {
  const navigate = useNavigate();
  return (
    <Stack
      direction="row"
      alignItems="center"
      sx={{ mb: 2 , cursor:"pointer"}}
      onClick={() => navigate(notification.url)}
    >
      <Avatar
        alt="Remy Sharp"
        src={notification?.from_user?.avatar}
        sx={{ width: 33, height: 33, mr: 1 }}
      />

      <Stack direction="column">
        <Stack direction="row" spacing={0.5}>

        <Typography variant="subtitle2">
          {notification?.from_user?.username} 
        </Typography>
        <Typography variant="body2">
          {notification.message}
        </Typography>
        </Stack>
        <Typography variant="caption">
          {calculateCreatedTime(notification.createdAt)}
        </Typography>
      </Stack>
    </Stack>
  );
};

export default NotificationItem;
