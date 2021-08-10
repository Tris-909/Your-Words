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
        const doc = new DOMParser().parseFromString(content, "text/html");
        const HTMLElementsArray = [...doc.body.children].map(
          (el) => el.outerHTML
        );
        const lastWord = HTMLElementsArray[HTMLElementsArray.length - 1];

        const wordArr = lastWord.split("");

        let numberOfTags = 0;
        for (let i = 0; i < wordArr.length - 1; i++) {
          if (wordArr[i] === "<") {
            numberOfTags += 1;
          }
        }

        let positionToInsertEmoji = 0;
        let countingTag = 0;
        for (let i = wordArr.length - 1; i >= 0; i--) {
          if (wordArr[i] === "<") {
            countingTag += 1;
            if (countingTag === numberOfTags / 2) {
              positionToInsertEmoji = i + 1;
              break;
            }
          }
        }

        wordArr.splice(positionToInsertEmoji - 1, 0, emoji.native);
        HTMLElementsArray[HTMLElementsArray.length - 1] = wordArr.join("");

        setContent(HTMLElementsArray.join(""));
      }}
      style={{ marginTop: "10px", marginBottom: "10px" }}
    />
  );
};

export default EmojiPicker;
