import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const EmojiPicker = ({ content, setContent }) => {
  return (
    <Picker
      set="twitter"
      emojiSize={30}
      showPreview={false}
      showSkinTones={false}
      onSelect={(emoji) => {
        console.log("emoji", emoji);
        setContent(`${content}${emoji.native}`);
      }}
      style={{ marginTop: "10px", marginBottom: "10px" }}
    />
  );
};

export default EmojiPicker;
