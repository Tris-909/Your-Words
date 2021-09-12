import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import CommonImage from "components/Common/Image/Image";
import { useOutsideClick } from "@chakra-ui/react";
import {
  updateStickerPositionLocally,
  updateStickerSizeLocally,
} from "redux/features/stickers/sticker";
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
  const [showBorder, setShowBorder] = useState(false);
  const ref = useRef();
  const dispatch = useDispatch();

  useOutsideClick({
    ref: ref,
    handler: () => setShowBorder(false),
  });

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

  const onResizeHandler = async ({ newWidth, newHeight }) => {
    setSize({
      width: newWidth,
      height: newHeight,
    });

    await executeGraphqlRequest(updateSticker, {
      id: sticker.id,
      width: newWidth,
      height: newHeight,
    });

    dispatch(updateStickerSizeLocally({ id: sticker.id, newWidth, newHeight }));
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
        onResizeHandler({
          newWidth: ref.style.width,
          newHeight: ref.style.height,
        });
      }}
      onClick={() => setShowBorder(true)}
      style={{
        border: showBorder ? "1px solid black" : "none",
      }}
    >
      <CommonImage
        ref={ref}
        id={sticker.id}
        source={sticker.source}
        draggable="false"
      />
    </Rnd>
  );
};

export default Sticker;
