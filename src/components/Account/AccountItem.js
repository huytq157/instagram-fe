import { Box, Avatar, Stack, Typography } from "@mui/material";
import { createNotification } from "../../services/notifications";
import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { followUser } from "../../services/follow";
import { accountKey } from "../../utils/react-query-key";
import { toast } from "react-hot-toast";

const AccountItem = ({ account, isFetching }) => {
  const { user } = useContext(AuthContext);

  const { socketRef } = useContext(SocketContext);
  const queryClient = useQueryClient();

  const { mutateAsync } = useMutation(followUser, {
    onError: () => {
      toast.error("Something went wrong!");
    },
    onSuccess: async (response) => {
      if (response && response.action === "unfollow") return;

      const notification = await createNotification({
        comment: null,
        post: null,
        user: [account?._id],
        message: "vừa theo dõi bạn",
        url: `/profile/${user?._id}`,
      });

      socketRef?.current?.emit("create-new-notification", notification);
    },
  });

  const handleFollowUser = () => {
    if (!user) return toast.error("You need to login to follow the user!");

    const oldData =
      queryClient.getQueryData([accountKey.GET_SUGGEST_ACCOUNT]) || [];

    queryClient.setQueryData(
      [accountKey.GET_SUGGEST_ACCOUNT],
      oldData.map((item) =>
        item._id === account._id
          ? { ...item, is_follow: !item.is_follow }
          : { ...item }
      )
    );

    mutateAsync(account._id);
  };

  return (
    <Stack direction="row" spacing={1} alignItems="center" sx={{ my: 2 }}>
      <Link
        to={`/profile/${account?._id}`}
        style={{ textDecoration: "none", color: "#333" }}
      >
        <Avatar alt="Remy Sharp" src={account?.avatar} />
      </Link>
      <Box sx={{ flex: 1 , textDecoration:"none", color:"#333"}}  component={Link}
        to={`/profile/${account?._id}`}>
        
          <Typography variant="button" gutterBottom>
            {account?.username}
          </Typography>
       
        <Typography variant="caption" display="block" gutterBottom>
          {account.fullname}
        </Typography>
      </Box>

      {user?._id !== account._id && (
        <Typography
          variant="button"
          gutterBottom
          disabled={isFetching}
          onClick={handleFollowUser}
          color="primary"
          sx={{ cursor: "pointer", fontSize:"14px" }}
        >
          {account.is_follow ? "Đang theo dõi" : "Theo dõi"}
        </Typography>
      )}
    </Stack>
  );
};

export default AccountItem;
