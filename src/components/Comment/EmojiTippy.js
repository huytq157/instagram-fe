import React from "react";
import { Box } from "@mui/material";
import EmojiPicker from "emoji-picker-react";
import Tippy from "@tippyjs/react/headless";
import Icon from "../../icons/Icon";

const EmojiTippy = ({ setShowSelectEmoji, showSelectEmoji, typingEmoji }) => {
  return (
    <Tippy
      content="emoji"
      interactive
      onClickOutside={() => setShowSelectEmoji()}
      visible={showSelectEmoji}
      render={(attrs) => (
        <Box {...attrs}>
          <EmojiPicker
            theme="dark"
            emojiVersion="1.0"
            onEmojiClick={(emoji) => typingEmoji(emoji.emoji)}
          />
        </Box>
      )}
      placement="auto-start"
    >
      <Box
        onClick={(e) => {
          e.stopPropagation();
          setShowSelectEmoji();
        }}
      >
        <Icon />
      </Box>
    </Tippy>
  );
};

export default React.memo(EmojiTippy);
