import Box from "@mui/material/Box";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Grid from "@mui/material/Grid";
import Button from "@mui/material/Button";
import IconButton from "@mui/material/IconButton";
import { useNavigate } from "react-router-dom";
import Modal from "@mui/material/Modal";
import Back from "../../icons/Back";
import { toast } from "react-hot-toast";
import AddIcon from "@mui/icons-material/Add";
import { styled } from "@mui/material/styles";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useCallback, useContext, useEffect, useRef, useState } from "react";
import { CreatePostModalContext } from "../../context/CreatePostModalContext";
import { AuthContext } from "../../context/AuthContext";
import { SocketContext } from "../../context/SocketContext";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { postKey } from "../../utils/react-query-key";
import { createNotification } from "../../services/notifications";
import uploadFile from "../../utils/upload";
import checkFile from "../../utils/checkFile";
import { addPost, editPost } from "../../services/posts";
import ImageSlide from "../Post/ImageSlide";
import EmojiTippy from "../Comment/EmojiTippy";
import VideoSlide from "../Post/VideoSlide";

const style = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "65%",
  bgcolor: "background.paper",
  overflow: "hidden",
  boxShadow: 24,
  borderRadius: "10px",
};

const VisuallyHiddenInput = styled("input")({
  clip: "rect(0 0 0 0)",
  clipPath: "inset(50%)",
  height: 1,
  overflow: "hidden",
  position: "absolute",
  bottom: 0,
  left: 0,
  whiteSpace: "nowrap",
  width: 1,
});

const initialFormData = {
  caption: "",
  files: [],
  type: "posts",
};

const CreateModal = ({ handleClose }) => {
  const { user } = useContext(AuthContext);
  const { socketRef } = useContext(SocketContext);
  const [loading, setLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);

  const { isOpen, setIsOpen, post, setPost, action, setAction } = useContext(
    CreatePostModalContext
  );

  const [formData, setFormData] = useState(
    post ? { ...initialFormData, caption: post.caption } : initialFormData
  );

  const queryClient = useQueryClient();
  const areaRef = useRef(null);
  const navigate = useNavigate();

  const [showSelectEmoji, setShowSelectEmoji] = useState(false);

  const typingEmoji = useCallback((emoji) => {
    setFormData((prev) => ({ ...prev, caption: (prev.caption += emoji) }));
    areaRef.current?.focus();
  }, []);

  const setStatusEmoji = useCallback(() => {
    setShowSelectEmoji((prev) => !prev);
  }, []);

  useEffect(() => {
    return () => {
      formData?.files?.length > 0 &&
        formData?.files?.forEach((file) => URL.revokeObjectURL(file.preview));
    };
  }, [formData?.files?.length]);

  const { mutateAsync } = useMutation(addPost);
  const { mutateAsync: editPostAsync } = useMutation(editPost);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);

    if (files.some((file) => !checkFile(["image", "video"], 50, file))) {
      return toast.error("Chỉ chấp nhận tệp hình ảnh hoặc video và dung lượng không vượt quá 5MB");
    }

    const videoFile = files.find((file) => file.type.startsWith("video/"));

    if (videoFile) {
      setVideoPreview(URL.createObjectURL(videoFile));
    }

    setFormData({
      ...formData,
      files: [
        ...formData.files,
        ...files?.map((file) => {
          return {
            file,
            preview: URL.createObjectURL(file),
          };
        }),
      ],
    });

    e.target.value = null;
  };

  const handleAddPost = async (e) => {
    e.preventDefault();

    if (action === "create") {
      if (!formData.caption || formData.files?.length === 0) {
        return toast.error("A caption or photo is required!");
      }
    } else {
      if (!formData.caption) {
        return toast.error("A caption is required!");
      }
    }

    let toastId;

    try {
      toastId = toast.loading(`${action} posts start`);
      setLoading(true);

      const media = await Promise.all(
        formData?.files?.map((file) => uploadFile(file.file))
      );

      const payload = {
        caption: formData.caption,
        media: post ? [...post?.media, ...media] : media,
        post_type: formData.type,
        user_id: user?._id,
      };

      if (action === "update") {
        payload._id = post?._id;
      }

      const newPost = await (action === "create"
        ? mutateAsync(payload)
        : editPostAsync(payload));

      setIsOpen(false);

      queryClient.refetchQueries([postKey.GET_HOME_FEED]);

      if (action === "create") {
        const notification = await createNotification({
          comment: null,
          message: "vừa thêm bài viết mới",
          post: newPost?.post?._id,
          url: `/post/${newPost?.post?._id}`,
        });

        socketRef?.current?.emit("create-new-notification", notification);
      }

      if (action === "update") {
        setPost(null);
        setAction("create");
      }

      toast.dismiss(toastId);
      toast.success(`${action} post success`);
      navigate("/");
    } catch (error) {
      toast.dismiss(toastId);
      toast.error(`${action} posts failed`);
    }
  };

  return (
    <Box>
      <Modal
        open={isOpen}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
        sx={{ borderRadius: "10px" }}
      >
        <form onSubmit={handleAddPost}>
          <Box sx={style}>
            <Stack
              direction="row"
              justifyContent="space-between"
              alignItems="center"
              sx={{ p: 1, borderBottom: "1px solid #ccc" }}
            >
              <Button variant="overline" onClick={handleClose}>
                <Back />
              </Button>
              <Typography variant="button" gutterBottom>
                {action} new {formData.type}
              </Typography>
              <Button
                variant="overline"
                disabled={loading}
                type="submit"
                onSubmit={handleAddPost}
              >
                Chia sẻ
              </Button>
            </Stack>

            <Grid container spacing={0} style={{ height: "100%" }}>

              <Grid item xs={7} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    position: "relative",
                    height: "450px",
                    width: "100%",
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    borderRight: "1px solid #ccc",
                  }}
                >

                  {post || formData?.files?.length > 0 ? (
                    <>
                      {formData?.files?.some((file) => file && file.file.type.startsWith("video/"))
                        ? (
                          <>
                            {/* <VideoSlide
                              media={
                                post
                                  ? [
                                    ...post.media,
                                    ...formData?.files?.map((file) => file.preview),
                                  ]
                                  : formData?.files?.map((file) => file.preview)
                              }
                            /> */}
                            {videoPreview && (
                              <video
                                width="100%"
                                height="100%"
                                controls
                                src={videoPreview}
                                style={{
                                  position: "absolute",
                                  top: 0,
                                  left: 0,
                                  zIndex: 1,
                                }}
                              />
                            )}
                          </>
                        )
                        : (
                          <ImageSlide
                            media={
                              post
                                ? [
                                  ...post.media,
                                  ...formData?.files?.map((file) => file.preview),
                                ]
                                : formData?.files?.map((file) => file.preview)
                            }
                          />
                        )}

                      <IconButton
                        component="label"
                        variant="contained"
                        sx={{
                          position: "absolute",
                          bottom: 10,
                          right: 10,
                          zIndex: 10,
                          background: "#333",
                        }}
                      >
                        <AddIcon /> <VisuallyHiddenInput type="file" />
                      </IconButton>
                    </>
                  ) : (
                    <Button
                      component="label"
                      variant="contained"
                      htmlFor="fileSelect"
                      startIcon={<CloudUploadIcon />}
                    >
                      Upload
                      <input
                        onChange={handleFileChange}
                        multiple
                        id="fileSelect"
                        type="file"
                        hidden

                      />
                    </Button>
                  )}
                </Box>
              </Grid>

              <Grid item xs={5} sx={{ height: "100%" }}>
                <Box
                  sx={{
                    display: "flex",
                    flexDirection: "column",
                  }}
                >
                  <Stack
                    direction="row"
                    spacing={2}
                    alignItems="center"
                    sx={{ p: 1 }}
                  >
                    <Avatar
                      alt="Remy Sharp"
                      src={user?.avatar}
                      sx={{ border: "1px solid #ccc" }}
                    />

                    <Typography
                      variant="subtitle2"
                      display="block"
                      gutterBottom
                    >
                      {user?.username}
                    </Typography>
                  </Stack>

                  <TextareaAutosize
                    aria-label="empty textarea"
                    placeholder="Viết chú thích..."
                    value={formData.caption}
                    onChange={(e) =>
                      setFormData({ ...formData, caption: e.target.value })
                    }
                    ref={areaRef}
                    style={{
                      border: "none",
                      resize: "none",
                      padding: "5px 10px",
                      background: "#fff",
                      outline: "none",
                      marginTop: "3px",
                      height: "320px",
                      overflow: "auto",
                    }}
                    maxRows={4}
                  />

                  <Box sx={{ ml: 1 }}>

                    <EmojiTippy
                      setShowSelectEmoji={setStatusEmoji}
                      typingEmoji={typingEmoji}
                      showSelectEmoji={showSelectEmoji}
                    />

                  </Box>
                </Box>
              </Grid>
            </Grid>
          </Box>
        </form>
      </Modal>
    </Box>
  );
};

export default CreateModal;


