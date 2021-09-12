import React, { useState } from "react";
import { Rnd } from "react-rnd";
import CommonImage from "components/Common/Image/Image";
import { updateStickerPositionLocally } from "redux/features/stickers/sticker";
import { useDispatch } from "react-redux";
import { updateSticker } from "graphql/mutations";
import { executeGraphqlRequest } from "libs/awsLib";

const Sticker = ({ sticker }) => {
  const [size, setSize] = useState({
    width: sticker.width,
    height: sticker.height,
  });
  const [position, setPosition] = useState({
    x: sticker.x,
    y: sticker.y,
  });
  const dispatch = useDispatch();

  const onChangePostionHandler = async ({ newX, newY }) => {
    setPosition({
      x: newX,
      y: newY,
    });

    await executeGraphqlRequest(updateSticker, {
      id: sticker.id,
      x: newX,
      y: newY,
    });

    dispatch(updateStickerPositionLocally({ id: sticker.id, newX, newY }));
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      bounds="parent"
      onDragStop={(e, d) => {
        onChangePostionHandler({
          newX: d.x,
          newY: d.y,
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
