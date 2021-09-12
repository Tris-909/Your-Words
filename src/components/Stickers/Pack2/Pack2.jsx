import React from "react";
import PackContainer from "components/Stickers/components/PackContainer/PackContainer";
import Sticker1 from "./beetle.png";
import Sticker2 from "./bees.png";
import Sticker3 from "./butterfly.png";
import Sticker4 from "./daisy.png";
import Sticker5 from "./flower.png";
import Sticker6 from "./flower(3).png";
import Sticker7 from "./flower(5).png";
import Sticker8 from "./flower(6).png";
import Sticker9 from "./flower(8).png";
import Sticker10 from "./flower(9).png";
import Sticker11 from "./flowers.png";
import Sticker12 from "./flowers(1).png";
import Sticker13 from "./flowers(2).png";
import Sticker14 from "./flowers(3).png";
import Sticker15 from "./flowers(4).png";
import Sticker16 from "./insect.png";
import Sticker17 from "./lemon.png";
import Sticker18 from "./nature.png";
import Sticker19 from "./nature(1).png";
import Sticker20 from "./lavender.png";

const PackTwo = ({ onSubmitSticker }) => {
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
    Sticker20,
  ];

  return (
    <PackContainer
      stickerArrays={StickerArrays}
      onSubmitSticker={onSubmitSticker}
    />
  );
};

export default PackTwo;
