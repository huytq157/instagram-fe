import {
  Stack,
  Avatar,
  Grid,
  Typography,
  Button,
  Box,
  Tabs,
  Tab,
} from "@mui/material";

import { useContext, useState } from "react";
import { AuthContext } from "../context/AuthContext";
import { SocketContext } from "../context/SocketContext";
import { followUser } from "../services/follow";
import { createNotification } from "../services/notifications";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { usersKey } from "../utils/react-query-key";
import { getUserInfoById } from "../services/users";
import { Link, useParams } from "react-router-dom";
import ListMyPost from "../components/Post/ListMyPost";
import SaveListPost from "../components/Post/SaveListPost";
import ProfileSkeleton from "../components/Sleketon/ProfileSkeleton";
import FolloweModal from "../components/Account/FollowerModal";
import FollowingModal from "../components/Account/FollowingModal";
// import { createConversation, getActiveConversations, getMessageList, sendMessage } from "../services/messages";

function CustomTabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
    </div>
  );
}

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    "aria-controls": `simple-tabpanel-${index}`,
  };
}

const Profile = () => {
  const [value, setValue] = useState(0);
  const [showFollowersModal, setShowFollowersModal] = useState(false); 
  const [showFollowingModal, setShowFollowingsModal] = useState(false); 
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const { _id } = useParams();
  const { user } = useContext(AuthContext);
  const { socketRef } = useContext(SocketContext);
  const queryClient = useQueryClient();



  const {
    data: profile,
    isLoading,
    isError,
    isFetching,
  } = useQuery([usersKey.GET_INFO(_id)], () => getUserInfoById(_id));

  const { mutateAsync, isLoading: followUserLoading } = useMutation(
    followUser,
    {
      onSuccess: async (response) => {
        if (response?.action === "unfollow") return;

        const notification = await createNotification({
          comment: null,
          post: null,
          user: [profile?.user?._id],
          message: "vừa theo dõi bạn",
          url: `/profile/${user?._id}`,
        });

        socketRef?.current?.emit("create-new-notification", notification);
      },
    }
  );

  const handleFollowUser = async () => {
    if (user?._id === _id) return;
    const key = usersKey.GET_INFO(_id);
    const newData = queryClient.getQueryData([key]);
    newData.user.is_follow = !newData.user.is_follow;
    queryClient.setQueryData([key], newData);
    mutateAsync(_id);
  };

  if (isError) {
    return <p>Failed to load data...</p>;
  }

  if (isLoading || !profile) {
    return <ProfileSkeleton/>;
  }

  return (
    <Grid container spacing={0} sx={{ px: 5 }}>
      <Grid item xs={4}>
        <Stack justifyContent="center">
          <Avatar
            alt="Remy Sharp"
            src={profile?.user?.avatar}
            sx={{ width: 150, height: 150, margin: "0 auto" }}
          />
        </Stack>
      </Grid>
      <Grid item xs={8}>
        <Box>
          <Stack direction="row" alignItems="center" spacing={3}>
            <Typography variant="button" display="block" gutterBottom>
              {profile?.user?.username}
            </Typography>

            {user?._id === profile?.user?._id ? (
              <Link to="/edit-profile">
                <Button
                  variant="contained"
                  sx={{
                    background: "#efefef",
                    boxShadow: "none",
                    color: "#333",
                    fontWeight: "500",

                    "&:hover": {
                      background: "#eee",
                    },
                  }}
                >
                  Chỉnh sửa trang cá nhân
                </Button>
              </Link>
            ) : (
              <>
                <Button
                  variant="contained"
                  disabled={followUserLoading || isFetching}
                  onClick={handleFollowUser}
                >
                  {profile?.user?.is_follow ? "Đang theo dõi" : "Theo dõi"}
                </Button>
                <Button variant="contained" >Nhắn tin</Button>
              </>
            )}
          </Stack>

          <Stack direction="row" alignItems="center" spacing={3} sx={{ my: 2 }}>
            <Typography variant="body2" display="block" gutterBottom>
              {profile?.user?.post_count} bài viết
            </Typography>
            <Typography variant="body2" display="block" gutterBottom onClick={()=>setShowFollowersModal(true) }>
            Đang theo dõi {profile?.user?.following_count} người dùng
            </Typography>
            <Typography variant="body2" display="block" gutterBottom onClick={() => setShowFollowingsModal(true)}>
             

              {profile?.user?.followers_count} người theo dõi
            </Typography>
          </Stack>

          <Typography variant="subtitle2" display="block" gutterBottom>
            {user?.fullname}
          </Typography>

          <Typography variant="caption" display="block" gutterBottom>
            {profile?.user?.email}
          </Typography>

          <Typography variant="caption">
            <Link
              to={profile?.user?.website}
              target="_blank"
              rel="noopener noreferrer"
            >
              {profile?.user?.website}
            </Link>
          </Typography>
        </Box>
      </Grid>
      <Box sx={{ width: "100%", mt: 4 }}>
        <Box
          sx={{
            borderBottom: 1,
            borderColor: "divider",
            width: "100%",
            display: "flex",
            justifyContent: "center",
          }}
        >
          <Tabs
            value={value}
            onChange={handleChange}
            aria-label="basic tabs example"
            sx={{ margin: "0 auto" }}
          >
            <Tab
              label="Bài viết"
              {...a11yProps(0)}
              sx={{ fontWeight: "500", color: "#333" }}
            />

            {user?._id === profile?.user?._id && (
              <Tab
                label="Đã lưu"
                {...a11yProps(1)}
                sx={{ fontWeight: "500", color: "#333" }}
              />
            )}
          </Tabs>
        </Box>
        <CustomTabPanel value={value} index={0}>
          <ListMyPost _id={_id} />
        </CustomTabPanel>
        {user?._id === profile?.user?._id && (
          <CustomTabPanel value={value} index={1}>
            <SaveListPost _id={_id} />
          </CustomTabPanel>
        )}
      </Box>

      {showFollowersModal && 

        <FolloweModal showFollowersModal={showFollowersModal} setShowFollowersModal={setShowFollowersModal} _id={_id}/>
      }

      {showFollowingModal && 

        <FollowingModal showFollowingModal={showFollowingModal} setShowFollowingsModal={setShowFollowingsModal} _id={_id}/>
      }

    </Grid>
  );
};

export default Profile;
