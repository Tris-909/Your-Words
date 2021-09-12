import React from "react";
import PackContainer from "components/Stickers/components/PackContainer/PackContainer";
import Sticker1 from "./creative.png";
import Sticker2 from "./creativity(0).png";
import Sticker3 from "./creativity(1).png";
import Sticker4 from "./creativity(2).png";
import Sticker5 from "./creativity(3).png";
import Sticker6 from "./creativity(4).png";
import Sticker7 from "./creativity(5).png";
import Sticker8 from "./creativity(6).png";
import Sticker9 from "./creativity(7).png";
import Sticker10 from "./creativity(8).png";
import Sticker11 from "./creativity(9).png";
import Sticker12 from "./creativity(10).png";
import Sticker13 from "./creativity(11).png";
import Sticker14 from "./idea.png";
import Sticker15 from "./new-idea.png";
import Sticker16 from "./notebook.png";
import Sticker17 from "./paint-palette.png";
import Sticker18 from "./paint-tube.png";
import Sticker19 from "./think-outside-the-box.png";

const PackOne = ({ onSubmitSticker }) => {
  const StickerArrays = [
    Sticker1,
    Sticker2,
    Sticker3,
    Sticker4,
    Sticker5,
    Sticker6,
    Sticker7,
    Sticker8,
    Sticker9,
    Sticker10,
    Sticker11,
    Sticker12,
    Sticker13,
    Sticker14,
    Sticker15,
    Sticker16,
    Sticker17,
    Sticker18,
    Sticker19,
  ];

  return (
    <PackContainer
      stickerArrays={StickerArrays}
      onSubmitSticker={onSubmitSticker}
    />
  );
};

export default PackOne;
