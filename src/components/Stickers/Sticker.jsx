import React, { useState } from "react";
import { Rnd } from "react-rnd";
import CommonImage from "components/Common/Image/Image";

const Sticker = ({ sticker }) => {
  const [size, setSize] = useState({
    width: sticker.width,
    height: sticker.height,
  });
  const [position, setPosition] = useState({
    x: sticker.x,
    y: sticker.y,
  });

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      bounds="parent"
      onDragStop={(e, d) => {
        setPosition({
          x: d.x,
          y: d.y,
        });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        });
      }}
    >
      <CommonImage id={sticker.id} source={sticker.source} draggable="false" />
    </Rnd>
  );
};

export default Sticker;
