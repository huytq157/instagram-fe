
import { useState, useRef, useCallback } from "react";
import { CircularProgress } from "react-cssfx-loading";
import { TextareaAutosize, Stack } from "@mui/material";
import EmojiTippy from "./EmojiTippy";

const FormComment = ({
  createCommentLoading,
  handleCreateComment,
  placeholder,
}) => {
  const [comment, setComment] = useState("");
  const [showSelectEmoji, setShowSelectEmoji] = useState(false);
  const inputRef = useRef(null);

  const typingEmoji = useCallback((emoji) => {
    setComment((prev) => (prev += emoji));
    inputRef.current?.focus();
  }, []);

  const setStatusEmoji = useCallback(() => {
    setShowSelectEmoji((prev) => !prev);
  }, []);

  return (
    <form
      onSubmit={(e) =>
        handleCreateComment(e, comment, () => {
          setComment("");
        })
      }
    >
      <Stack direction="row" spacing={2} alignItems="center" sx={{py:2}}>
        <EmojiTippy
          setShowSelectEmoji={setStatusEmoji}
          showSelectEmoji={showSelectEmoji}
          typingEmoji={typingEmoji}
        />
        <TextareaAutosize
          ref={inputRef}
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder={placeholder || "Add a comment..."}
          style={{
            border: "none",
            flex: 1,
            resize: "none",
            padding: "5px",
            background: "#fff",
            outline: "none",
          }}
        />
        <button disabled={createCommentLoading} className="post-button">
          {createCommentLoading ? (
            <CircularProgress color="#fff" width={20} height={20} />
          ) : (
            "Post"
          )}
        </button>
      </Stack>
    </form>
  );
};

export default FormComment;
