// MUI
import { Box, Popover, Typography } from "@mui/material";
import { styled, alpha } from "@mui/material/styles";
import { useEffect } from "react";
import { useQueryClient } from "@tanstack/react-query";
import { notificationKey } from "../../../utils/react-query-key";
import { updateStatusSeen } from "../../../services/notifications";
import NotificationItem from "./NotificationItem";

const StyledPopover = styled((props) => (
  <Popover
    anchorOrigin={{
      vertical: "top",
      horizontal: "left",
    }}
    transformOrigin={{
      vertical: "top",
      horizontal: "right",
    }}
    {...props}
  />
))(({ theme }) => ({
  "& .MuiPaper-root": {
    minWidth: 300,
    height: "100vh",
    marginLeft: "18%",
    color:
      theme.palette.mode === "light"
        ? "rgb(55, 65, 81)"
        : theme.palette.grey[300],
    boxShadow:
      "rgb(255, 255, 255) 0px 0px 0px 0px, rgba(0, 0, 0, 0.05) 0px 0px 0px 1px, rgba(0, 0, 0, 0.1) 0px 10px 15px -3px, rgba(0, 0, 0, 0.05) 0px 4px 6px -2px",
    "& .MuiMenu-list": {
      padding: "4px 0",
    },
    "& .MuiMenuItem-root": {
      "& .MuiSvgIcon-root": {
        fontSize: 18,
        color: theme.palette.text.secondary,
        marginRight: theme.spacing(1.5),
      },
      "&:active": {
        backgroundColor: alpha(
          theme.palette.primary.main,
          theme.palette.action.selectedOpacity
        ),
      },
    },
  },
}));

const BoxNotification = ({
  openNotification,
  anchorEl,
  setOpenNotification,
  notifications,
}) => {
  const queryClient = useQueryClient();

  useEffect(() => {
    const key = notificationKey.GET_NOTIFICATION;
    const newData = queryClient.getQueryData([key]);
    if (newData?.notifications?.some((item) => !item.read)) {
      queryClient.setQueryData([key], {
        ...newData,
        notifications: newData?.notifications.map((item) => ({
          ...item,
          read: true,
        })),
      });
      updateStatusSeen();
    }
  }, [notifications]);

  // if (notifications?.length === 0) {
  //   return (
  //     <Typography variant="caption">
  //    Không có thông báo gần đây
  //   </Typography>
  //   );
  // }

  return (
    <StyledPopover
      open={openNotification}
      anchorEl={anchorEl}
      onClose={() => setOpenNotification(false)}
      disableRestoreFocus
    >
      <Box sx={{ padding: "12px 18px" }}>
        <Typography variant="h6" sx={{ fontSize: "16px", mb: 2 }}>
          Thông báo
        </Typography>

        {notifications?.length === 0 && (
          <Typography variant="caption">Không có thông báo gần đây</Typography>
        )}

        {notifications?.map((item) => (
          <NotificationItem notification={item} key={item._id} />
        ))}
      </Box>
    </StyledPopover>
  );
};

export default BoxNotification;
