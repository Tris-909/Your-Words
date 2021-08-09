import React from "react";
import "emoji-mart/css/emoji-mart.css";
import { Picker } from "emoji-mart";

const EmojiPicker = ({ content, setContent }) => {
  const isEmpty = (str) => {
    return str.replace(/^\s+|\s+$/g, "").length == 0;
  };

  return (
    <Picker
      set="twitter"
      emojiSize={30}
      showPreview={false}
      showSkinTones={false}
      onSelect={(emoji) => {
        console.log("emoji", emoji);
        console.log("content", content);

        const test = content.match(/<h(.)>.*?<\/h\1>/g);
        console.log("test", test);

        // Between >{children} [HERE] <
        // Write a logic to insert an emoji.native into HERE position for the last element in the test array

        setContent(content + emoji.native);
      }}
      style={{ marginTop: "10px", marginBottom: "10px" }}
    />
  );
};

export default EmojiPicker;
