import {
  Card,
  CardHeader,
  Stack,
  IconButton,
  Avatar,
  Typography,
  Divider,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button
} from "@mui/material";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import { Link } from "react-router-dom";

import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { useContext, useState } from "react";
import Box from "@mui/material/Box";
import { red } from "@mui/material/colors";
import Save from "../../icons/Save";
import Like from "../../icons/Like";
import Notification from "../../icons/Notification";
import calculateCreatedTime from "../../utils/formatDate";
import { toast } from "react-hot-toast";
import { HidePost, getPost, likePost, removePost, savePost } from "../../services/posts";
import { useQueryClient, useMutation, useQuery } from "@tanstack/react-query";
import { createNotification } from "../../services/notifications";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";
import SaveAs from "../../icons/SaveAs";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const PostItem = ({ post, isFetching, index, limit }) => {
  const [anchorEl, setAnchorEl] = useState(null);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const [videoPlaying, setVideoPlaying] = useState(false);
  const open = Boolean(anchorEl);
  const { user } = useContext(AuthContext);
  const { socketRef } = useContext(SocketContext);
  const { setIsOpen, setPost, setAction } = useContext(CreatePostModalContext);

  const [showFullCaption, setShowFullCaption] = useState(false);
  const queryClient = useQueryClient();
  const { data: allposts } = useQuery(["posts", post._id], () =>
    getPost(post._id)
  );

  const handleVideoClick = () => {
    const video = document.getElementById(`video-${post._id}`);
    if (video) {
      if (video.paused) {
        video.play();
        setVideoPlaying(true);
      } else {
        video.pause();
        setVideoPlaying(false);
      }
    }
  };

  const { mutateAsync: likePostAsync } = useMutation(likePost, {
    onError: () => {
      console.log("Something went wrong");
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries("posts");
      if (user?._id === allposts?.user._id || response?.action === "unlike")
        return;
      const notification = await createNotification({
        comment: null,
        post: allposts._id,
        message: "vừa thích bài viết của bạn",
        url: `/post/${allposts._id}`,
        user: [allposts?.user._id],
      });

      socketRef.current?.emit("create-new-notification", notification);
    },
  });

  const handleLikePost = () => {
    likePostAsync(post._id);
  };

  const { mutateAsync: savePostAsync } = useMutation(savePost, {
    onError: () => {
      console.log("Something went wrong");
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries("posts");
      if (user?._id === allposts?.user._id || response?.action === "unsave")
        return;
    },
  });

  const handleSavePost = () => {
    savePostAsync(post._id);
  };

  const { mutateAsync: HidePostAsync } = useMutation(HidePost, {
    onError: () => {
      console.log("Something went wrong");
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries("posts");
      if (user?._id === allposts?.user._id || response?.action === "unsave")
        return;
    },
  });

  const handleHidePost = () => {
    HidePostAsync(post._id);
  };


  const { mutateAsync: removePostAsync, isLoading } = useMutation(removePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      toast.success("Xóa bài viết thành công");
    },
  });

  const handleRemovePost = () => {
    setAnchorEl(null);
    setShowDeleteDialog(true);
  };

  const handleConfirmRemovePost = () => {
    removePostAsync(post._id);
    setShowDeleteDialog(false);
  };

  const handleCancelRemovePost = () => {
    setShowDeleteDialog(false);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const toggleCaption = () => {
    setShowFullCaption(!showFullCaption);
  };

  const handleOpenModalEdit = () => {
    setAction("update");
    setPost(post);
    setIsOpen(true);
  };

  return (
    <>
      <Card
        sx={{
          width: "80%",
          margin: "0 auto",
          mt: 2,
          boxShadow: "none",
          background: "#f9fafb",
        }}
      >
        <CardHeader
          avatar={
            <Link to={`/profile/${post?.user?._id}`}>
              <Avatar
                sx={{ bgcolor: red[500] }}
                aria-label="recipe"
                src={post.user?.avatar}
              />
            </Link>
          }
          action={
            <IconButton
              aria-label="settings"
              onClick={(event) => setAnchorEl(event.currentTarget)}
              size="small"
              sx={{ ml: 2 }}
              aria-controls={open ? "account-menu" : undefined}
              aria-haspopup="true"
              aria-expanded={open ? "true" : undefined}
            >
              <MoreVertIcon />
            </IconButton>
          }
          title={post.user?.username}
          subheader={calculateCreatedTime(post.createdAt)}
        />

        <Menu
          anchorEl={anchorEl}
          id="account-menu"
          open={open}
          onClose={handleClose}
          onClick={handleClose}
          transformOrigin={{ horizontal: "right", vertical: "top" }}
          anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
        >
          {user?._id === post?.user?._id && (
            <Box>
              <MenuItem onClick={handleOpenModalEdit}>
                Chỉnh sửa bài viết
              </MenuItem>
              <MenuItem disabled={isLoading} onClick={handleRemovePost}>
                Xóa bài viết
              </MenuItem>
              <MenuItem disabled={isLoading} onClick={handleHidePost}>
                {post?.isPublic ? "Ẩn bài viêt" : "Bỏ ẩn bài viết"}
              </MenuItem>
            </Box>
          )}

          <MenuItem onClick={handleSavePost}>
            {post.is_save ? "Bỏ Lưu bài viết" : "Lưu bài viết"}
          </MenuItem>


        </Menu>

        <Swiper
          cssMode={true}
          navigation={true}
          pagination={true}
          mousewheel={true}
          keyboard={true}
          modules={[Navigation, Pagination, Mousewheel, Keyboard]}
          className="mySwiper"
        >

          {post?.media?.map((item, idx) => (
            <SwiperSlide key={idx}>
              {item.endsWith(".jpg") || item.endsWith(".jpeg") || item.endsWith(".png") ? (
                <Avatar
                  alt="Remy Sharp"
                  src={item}
                  sx={{ borderRadius: 0, width: "100%", height: "auto" }}
                  component={Link}
                  to={`/post/${post._id}`}
                />
              ) : item.endsWith(".mp4") ? (
                <div style={{ position: "relative", width: "100%", height: "auto" }}>
                <video
                  id={`video-${post._id}`}
                  width="100%"
                  height="auto"
                  controls={false} 
                  onClick={handleVideoClick}
                  style={{ display: "flex", justifyContent: "center", alignItems: "center" }}
                >
                  <source src={item} type="video/mp4" />
                  Trình duyệt của bạn không hỗ trợ thẻ video.
                </video>
             
                <IconButton
                  onClick={handleVideoClick}
                  style={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    backgroundColor: "rgba(255, 255, 255, 0.5)",
                  }}
                >
                  {videoPlaying ? <PauseIcon /> : <PlayArrowIcon />}
                </IconButton>
              </div>
              ) : null}
            </SwiperSlide>
          ))}
        </Swiper>

        <Stack
          direction="row"
          alignItems="center"
          justifyContent="space-between"
          sx={{ py: 1 }}
        >
          <Box
            sx={{
              display: "flex",
              width: "60px",
              justifyContent: "space-between",
            }}
            onClick={handleLikePost}
          >
            {post.is_liked ? <Like /> : <Notification />}
          </Box>

          <Box sx={{ display: "flex" }} onClick={handleSavePost}>
            {post.is_save ? <SaveAs /> : <Save sx={{ right: 0 }} />}
          </Box>
        </Stack>
        <Typography variant="subtitle2" display="block" gutterBottom>
          {post.like_count} lượt thích
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {showFullCaption
            ? post?.caption
            : `${post?.caption.slice(0, 100)}...`}
        </Typography>
        {post?.caption.length > 100 && (
          <Typography
            variant="caption"
            display="block"
            gutterBottom
            onClick={toggleCaption}
            style={{ cursor: "pointer", color: "blue" }}
          >
            {showFullCaption ? "Ẩn bớt" : "Xem thêm"}
          </Typography>
        )}
        <Typography
          variant="body2"
          color="text.secondary"
          style={{ cursor: "pointer" }}
          component={Link}
          to={`/post/${post._id}`}
        >
          Xem tất cả {post.comment_count} bình luận
        </Typography>
        <Divider sx={{ my: 2 }} />

        <Dialog
          open={showDeleteDialog}
          onClose={handleCancelRemovePost}
          aria-labelledby="alert-dialog-title"
          aria-describedby="alert-dialog-description"
        >
          <DialogTitle id="alert-dialog-title">Xác nhận xóa</DialogTitle>
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              Bạn có muốn xóa bài viết không?
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button onClick={handleCancelRemovePost} color="error">Hủy</Button>
            <Button onClick={handleConfirmRemovePost} color="success" autoFocus>
              Xóa
            </Button>
          </DialogActions>
        </Dialog>
      </Card>
    </>
  );
};
export default PostItem;
