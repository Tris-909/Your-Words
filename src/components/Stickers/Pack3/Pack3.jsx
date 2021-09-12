import React from "react";
import PackContainer from "components/Stickers/components/PackContainer/PackContainer";
import Sticker1 from "./angry.png";
import Sticker2 from "./beautiful.png";
import Sticker3 from "./carefree.png";
import Sticker4 from "./celebration.png";
import Sticker5 from "./cooking.png";
import Sticker6 from "./dream.png";
import Sticker7 from "./hand-mirror.png";
import Sticker8 from "./happy-birthday.png";
import Sticker9 from "./have-a-nice-day.png";
import Sticker10 from "./hungry.png";
import Sticker11 from "./introvert.png";
import Sticker12 from "./miss-you.png";
import Sticker13 from "./not-today.png";
import Sticker14 from "./sleep.png";
import Sticker15 from "./sleep2.png";
import Sticker16 from "./sorry.png";
import Sticker17 from "./summer-holidays.png";
import Sticker18 from "./thank-you.png";
import Sticker19 from "./yummy.png";

const PackThree = ({ onSubmitSticker }) => {
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

export default PackThree;
