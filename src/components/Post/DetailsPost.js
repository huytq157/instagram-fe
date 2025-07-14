import {
  Typography,
  Box,
  Grid,
  Avatar,
  IconButton,
  Stack,
  Button,
  Menu,
  MenuItem,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Mousewheel, Keyboard } from "swiper/modules";
import { Link, useParams, useNavigate } from "react-router-dom";
import { toast } from "react-hot-toast";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import Notification from "../../icons/Notification";
import Save from "../../icons/Save";
import calculateCreatedTime from "../../utils/formatDate";
import Like from "../../icons/Like";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import {
  HidePost,
  createComment,
  getComment,
  getPost,
  likePost,
  removePost,
  savePost,
} from "../../services/posts";
import { useContext, useState } from "react";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { createNotification } from "../../services/notifications";
import InstagramIcon from "@mui/icons-material/Instagram";

import CommentItem from "../Comment/CommentItem";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";
import FormComment from "../Comment/FormComment";
import SaveAs from "../../icons/SaveAs";
import PauseIcon from '@mui/icons-material/Pause';
import PlayArrowIcon from '@mui/icons-material/PlayArrow';

const style = {
  position: "fixed",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "100%",
  height: "100%",
  bgcolor: "background.paper",
  boxShadow: 24,
  borderRadius: "5px",
  overflow: "hidden",
  border: "none",
};

const closeButtonStyle = {
  position: "relative",
  top: "10px",
  left: "10px",
  zIndex: 9999,
  cursor: "pointer",
  color: "#fff",
};

const DetailsPost = () => {
  const { _id } = useParams();
  const queryClient = useQueryClient();
  const [videoPlaying, setVideoPlaying] = useState(false);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);
  const { user } = useContext(AuthContext);
  const { socketRef } = useContext(SocketContext);

  const navigate = useNavigate();

  const { setIsOpen, setPost, setAction } = useContext(CreatePostModalContext);

  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };

  const { data: allposts } = useQuery(["posts", _id], () => getPost(_id));
  const { data: allcomments } = useQuery(["comments", _id], () =>
    getComment(_id)
  );

  const handleVideoClick = () => {
    const video = document.getElementById(`video-${allposts._id}`);
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
      toast.error("Something went wrong");
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
    likePostAsync(_id);
  };

  const { mutateAsync: createCommentAsync, isLoading: createCommentLoading } =
    useMutation(createComment, {
      onSuccess: async (response) => {
        queryClient.invalidateQueries(["comments", _id]);

        if (user?._id === allposts?.user?._id) return;

        const notification = await createNotification({
          comment: response._id,
          message: "vừa bình luận bài viết của bạn",
          post: response.post,
          url: `/post/${response.post}?comment=${response._id}`,
          user: [allposts?.user?._id],
        });

        socketRef?.current?.emit("create-new-notification", notification);
      },
    });

  const handleCommentSubmit = async (e, commentText) => {
    e.preventDefault();

    if (!commentText.trim()) {
      toast.error("Please enter a valid comment");
      return;
    }

    await createCommentAsync({
      post_id: _id,
      comment: commentText,
    });
  };

  const { mutateAsync: HidePostAsync } = useMutation(HidePost, {
    onError: () => {
      console.log("Something went wrong");
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries("posts");
      if (
        user?._id === allposts?.post?.user._id ||
        response?.action === "unsave"
      )
        return;
    },
  });

  const handleHidePost = () => {
    HidePostAsync(_id);
  };

  const { mutateAsync: savePostAsync } = useMutation(savePost, {
    onError: () => {
      console.log("Something went wrong");
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries("posts");
      if (user?._id === allposts?.user._id || response?.action === "unsave") {
        return;
      }
      toast.success("thành công");
    },
  });

  const handleSavePost = () => {
    savePostAsync(_id);
  };

  const handleOpenModalEdit = () => {
    setAction("update");
    setPost(allposts);
    setIsOpen(true);
  };

  const { mutateAsync: removePostAsync, isLoading } = useMutation(removePost, {
    onSuccess: () => {
      queryClient.invalidateQueries("posts");
      toast.success("Xóa bài viết thành công");
      navigate(`/profile/${allposts?.user?._id}`);
    },
  });

  const handleRemovePost = () => {
    setAnchorEl(null);
    setShowDeleteDialog(true);
  };

  const handleConfirmRemovePost = () => {
    removePostAsync(_id);
    setShowDeleteDialog(false);
  };

  const handleCancelRemovePost = () => {
    setShowDeleteDialog(false);
  };

  return (
    <>
      <IconButton sx={closeButtonStyle} component={Link} to="/">
        <InstagramIcon />
      </IconButton>
      <Box>
        <Box sx={style}>
          <Box sx={{ height: "100%" }}>
            <Grid container spacing={0} sx={{ height: "100%" }}>
              <Grid item xs={6} sx={{ height: "100%" }}>
                <Swiper
                  cssMode={true}
                  navigation={true}
                  pagination={true}
                  mousewheel={true}
                  keyboard={true}
                  modules={[Navigation, Pagination, Mousewheel, Keyboard]}
                  className="mySwiper"
                >
                  {/* {allposts?.media?.map((item) => (
                    <SwiperSlide key={item}>
                      <Avatar
                        alt="Remy Sharp"
                        src={item}
                        sx={{
                          borderRadius: 0,
                          width: "100%",
                          height: "100%",
                          p: 0,
                          objectFit: "cover",
                        }}
                      />
                    </SwiperSlide>
                  ))} */}

                  {allposts?.media?.map((item, idx) => (
                    <SwiperSlide key={idx}>
                      {item.endsWith(".jpg") || item.endsWith(".jpeg") || item.endsWith(".png") ? (
                        <Avatar
                          alt="Remy Sharp"
                          src={item}
                          sx={{ borderRadius: 0, width: "100%", height: "auto" }}
                          component={Link}
                          to={`/post/${allposts._id}`}
                        />
                      ) : item.endsWith(".mp4") ? (
                        <div style={{ position: "relative", width: "100%", height: "100%" }}>
                          <video
                            id={`video-${allposts._id}`}
                            width="100%"
                            height="auto"
                            controls={false}
                            onClick={handleVideoClick}
                            style={{ display: "flex", justifyContent: "center", alignItems: "center" , height:"100%", background:"#000"}}
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
              </Grid>
              <Grid item xs={6} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                    width: "100%",
                    height: "100%",
                  }}
                >
                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      borderBottom: "1px solid #ccc",
                      p: 1,
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      justifyContent="space-between"
                      spacing={2}
                    >
                      <Stack direction="row" alignItems="center" spacing={2}>
                        <Link to={`/profile/${allposts?.user?._id}`}>
                          <Avatar
                            alt="Remy Sharp"
                            src={allposts?.user?.avatar}
                            sx={{ width: "30px", height: "30px" }}
                          />
                        </Link>

                        <Typography variant="subtitle2" gutterBottom>
                          {allposts?.user?.username}
                        </Typography>
                      </Stack>

                      <Box>
                        <IconButton
                          aria-label="more"
                          id="long-button"
                          aria-controls={open ? "long-menu" : undefined}
                          aria-expanded={open ? "true" : undefined}
                          aria-haspopup="true"
                          onClick={handleClick}
                        >
                          <MoreVertIcon />
                        </IconButton>
                        <Menu
                          id="long-menu"
                          MenuListProps={{
                            "aria-labelledby": "long-button",
                          }}
                          anchorEl={anchorEl}
                          open={open}
                          onClose={handleClose}
                        >
                          {user?._id === allposts?.user?._id && (
                            <Box>
                              <MenuItem onClick={handleOpenModalEdit}>
                                Chỉnh sửa bài viết
                              </MenuItem>
                              <MenuItem
                                disabled={isLoading}
                                onClick={handleRemovePost}
                              >
                                Xóa bài viết
                              </MenuItem>
                              <MenuItem onClick={handleHidePost}>
                                {allposts?.isPublic
                                  ? "Ẩn bài viêt"
                                  : "Bỏ ẩn bài viết"}
                              </MenuItem>
                            </Box>
                          )}
                          <MenuItem onClick={handleSavePost}>
                            {allposts?.is_saved
                              ? "Bỏ Lưu bài viết"
                              : "Lưu bài viết"}
                          </MenuItem>
                        </Menu>
                      </Box>
                    </Stack>
                  </Box>

                  <Box
                    sx={{
                      position: "relative",
                      height: "100%",
                      overflow: "auto",
                      p: 2,
                    }}
                  >
                    <Stack
                      direction="row"
                      alignItems="center"
                      spacing={1}
                      sx={{ mb: 3 }}
                    >
                      <Avatar
                        alt="Remy Sharp"
                        src={allposts?.user?.avatar}
                        sx={{ width: "30px", height: "30px" }}
                      />

                      <Box>
                        <Stack direction="row" spacing={1} alignItems="center">
                          <Typography variant="subtitle2" gutterBottom>
                            {allposts?.user?.username}
                          </Typography>
                          <Typography variant="caption" gutterBottom>
                            {calculateCreatedTime(allposts?.updatedAt)}
                          </Typography>
                        </Stack>

                        <Typography variant="subtitle2" gutterBottom>
                          {allposts?.caption}
                        </Typography>
                      </Box>
                    </Stack>
                    {allcomments?.map((comment) => (
                      <CommentItem
                        comment={comment}
                        key={comment._id}
                        allposts={allposts}
                      />
                    ))}
                  </Box>

                  <Box
                    sx={{
                      position: "relative",
                      width: "100%",
                      p: 1,
                      borderTop: "1px solid #ccc",
                    }}
                  >
                    <Stack direction="row" justifyContent="space-between">
                      <Stack direction="row">
                        <Box onClick={handleLikePost}>
                          {allposts?.is_liked ? <Like /> : <Notification />}
                        </Box>
                      </Stack>

                      <Box>
                        <Box sx={{ display: "flex" }} onClick={handleSavePost}>
                          {allposts?.is_saved ? (
                            <SaveAs />
                          ) : (
                            <Save sx={{ right: 0 }} />
                          )}
                        </Box>
                      </Box>
                    </Stack>

                    <Typography variant="subtitle2" gutterBottom>
                      {allposts?.like_count} lượt thích
                    </Typography>

                    <Typography variant="body2" gutterBottom>
                      {calculateCreatedTime(allposts?.createdAt)}
                    </Typography>

                    <FormComment
                      handleCreateComment={handleCommentSubmit}
                      createCommentLoading={createCommentLoading}
                    />
                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </Box>
      </Box>

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
          <Button onClick={handleCancelRemovePost} color="error">
            Hủy
          </Button>
          <Button onClick={handleConfirmRemovePost} color="success" autoFocus>
            Xóa
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default DetailsPost;
