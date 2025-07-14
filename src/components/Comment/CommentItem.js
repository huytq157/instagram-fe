import {
  Typography,
  Box,
  Avatar,
  Stack,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Button,
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import calculateCreatedTime from "../../utils/formatDate";
import Heard from "../../icons/Heard";
import { useContext, useState } from "react";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  deleteComment,
  getComment,
  likeComment,
  replyComment,
} from "../../services/posts";
import { AuthContext } from "../../context/AuthContext";
import Likesmall from "../../icons/Likesmall";
import { postKey } from "../../utils/react-query-key";
import { toast } from "react-hot-toast";
import { createNotification } from "../../services/notifications";
import { SocketContext } from "../../context/SocketContext";
import { Link } from "react-router-dom";
import FormComment from "./FormComment";

const CommentItem = ({ comment, allposts }) => {
  const [showReply, setShowReply] = useState(false);
  const { user } = useContext(AuthContext);
  const queryClient = useQueryClient();
  const { socketRef } = useContext(SocketContext);
  const [showDeleteDialog, setShowDeleteDialog] = useState(false);

  const [showReplyForm, setShowReplyForm] = useState(false);

  const { data } = useQuery(
    [postKey.GET_REPLY_COMMENT(comment._id, showReply)],
    () => {
      if (!showReply) return null;
      return getComment(comment.post, comment._id);
    }
  );

  const { mutateAsync: replyCommentAsync, isLoading } = useMutation(
    replyComment,
    {
      onSuccess: async (response) => {
        if (response.success) {
          queryClient.invalidateQueries("posts");
          queryClient.invalidateQueries("comments");

          setShowReplyForm((prev) => !prev);

          if (user?._id === comment.user?._id) return;

          const notification = await createNotification({
            comment: comment._id,
            message: "vừa nhắc đến bạn trong một bình luận",
            post: comment.post,
            url: `/post/${comment.post}?comment=${comment._id}`,
            user: [comment.user._id],
          });

          socketRef?.current?.emit("create-new-notification", notification);
        }
      },
      onError: () => {
        toast.error("Something went wrong!");
      },
    }
  );

  const createReplyComment = (e, text) => {
    e.preventDefault();
    if (!text.trim()) return;
    replyCommentAsync({
      comment: text,
      parent_id: comment._id,
      post_id: comment.post,
    });
  };

  const { mutateAsync: deleteCommentAsync } = useMutation(deleteComment, {
    onSuccess: () => {
      queryClient.getQueryData(["comments", comment.post]);
      queryClient.invalidateQueries("comments");

      if (comment.parent_id === null) {
        queryClient.setQueryData(["comments", comment.post]);
      } else {
        queryClient.refetchQueries(["reply-comment", comment.parent_id, true]);
      }
    },
  });

  const handleDeleteComment = () => {
    setShowDeleteDialog(true);
  };

  const handleConfirmDeleteComment = () => {
    deleteCommentAsync(comment._id);
    setShowDeleteDialog(false);
  };

  const handleCancelDeleteComment = () => {
    setShowDeleteDialog(false);
  };

  const { mutateAsync } = useMutation(likeComment, {
    onError: () => {
      toast.error("Something went wrong!");
    },
    onSuccess: async (response) => {
      queryClient.invalidateQueries("comments");

      if (user?._id === comment?.user._id) return;
      const notification = await createNotification({
        comment: null,
        post: comment?.post,
        message: "vừa thích  bình luận của bạn",
        url: `/post/${comment?.post}`,
        user: [comment?.user._id],
      });

      socketRef.current?.emit("create-new-notification", notification);
    },
  });

  const handleLikeComment = () => {
    queryClient.invalidateQueries(["comments", comment.post]);

    if (comment.parent_id === null) {
      queryClient.invalidateQueries(["comments", comment.post]);
    } else {
      const key = postKey.GET_REPLY_COMMENT(comment.parent_id, true);
      const newDataReplies = queryClient.getQueryData([key]);

      queryClient.setQueryData(
        [key],
        newDataReplies?.map((item) =>
          item._id === comment._id
            ? {
                ...comment,
                is_liked: !comment.is_liked,
                like_count: comment.is_liked
                  ? comment.like_count - 1
                  : comment.like_count + 1,
              }
            : item
        )
      );
    }

    mutateAsync(comment._id);
  };

  return (
    <>
      {comment && (
        <Box sx={{ mb: 2 }}>
          <Stack direction="row" spacing={1} justifyContent="space-between">
            <Link to={`/profile/${comment?.user?._id}`}>
              <Avatar
                alt="Remy Sharp"
                src={comment?.user?.avatar}
                sx={{ width: "30px", height: "30px" }}
              />
            </Link>

            <Box sx={{ flex: 1 }}>
              <Stack direction="row" alignItems="center" spacing={1}>
                <Typography variant="subtitle2" display="block" gutterBottom>
                  {comment?.user?.username}
                </Typography>
                <Typography variant="caption" display="block" gutterBottom>
                  {calculateCreatedTime(comment?.updatedAt)}
                </Typography>
              </Stack>

              <Typography
                variant="body2"
                display="block"
                gutterBottom
                sx={{ pb: 0.5 }}
              >
                {comment?.comment}
              </Typography>

              <Stack direction="row" spacing={2} sx={{ pb: 1 }}>
                <Typography variant="caption" display="block" gutterBottom>
                  {comment?.like_count} lượt thích
                </Typography>

                {!comment.parent_id && (
                  <Typography
                    variant="caption"
                    display="block"
                    gutterBottom
                    sx={{ cursor: "pointer" }}
                    onClick={() => setShowReplyForm((prev) => !prev)}
                  >
                    {showReplyForm ? "Hủy" : "Trả lời"}
                  </Typography>
                )}
              </Stack>
            </Box>

            <Stack direction="row">
              <Box onClick={handleLikeComment}>
                {comment.is_liked ? <Likesmall /> : <Heard />}
              </Box>

              {user?._id === comment?.user?._id && (
                <DeleteIcon
                  color="error"
                  sx={{ fontSize: "19px", ml: 1 }}
                  onClick={handleDeleteComment}
                />
              )}
            </Stack>
          </Stack>

          <Box sx={{ ml: 4 , py:1}}>
            {showReplyForm && (
              <FormComment
                handleCreateComment={createReplyComment}
                createCommentLoading={isLoading}
                placeholder={`Reply from ${comment.user?.username}`}
              />
            )}
          </Box>

          {comment?.num_replies ? (
            <Typography
              variant="caption"
              display="block"
              gutterBottom
              sx={{ ml: 9, mb: 1, cursor: "pointer" }}
              onClick={() => setShowReply((prev) => !prev)}
            >
              {showReply
                ? "Ẩn bớt"
                : ` Xem thêm  ${comment?.num_replies} phản hồi`}
            </Typography>
          ) : (
            <></>
          )}

          {showReply && (
            <Box sx={{ ml: 9 }}>
              {data?.map((item) => (
                <CommentItem key={item._id} comment={item} />
              ))}
            </Box>
          )}

          <Dialog
            open={showDeleteDialog}
            onClose={handleCancelDeleteComment}
            aria-labelledby="alert-dialog-title"
            aria-describedby="alert-dialog-description"
          >
            <DialogTitle id="alert-dialog-title">Xác nhận xóa</DialogTitle>
            <DialogContent>
              <DialogContentText id="alert-dialog-description">
                Bạn có muốn xóa comment không ?
              </DialogContentText>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCancelDeleteComment} color="error">
                Hủy
              </Button>
              <Button
                onClick={handleConfirmDeleteComment}
                color="success"
                autoFocus
              >
                Xóa
              </Button>
            </DialogActions>
          </Dialog>
        </Box>
      )}
    </>
  );
};

export default CommentItem;
