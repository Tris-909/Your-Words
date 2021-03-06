import React, { useState, useRef } from "react";
import { Rnd } from "react-rnd";
import CommonImage from "components/Common/Image/Image";
import { Box, useOutsideClick } from "@chakra-ui/react";
import { BiTrash } from "react-icons/bi";
import {
  updateStickerPositionLocally,
  updateStickerSizeLocally,
  removeStickerLocally,
} from "redux/features/stickers/sticker";
import { useSelector, useDispatch } from "react-redux";
import { updateSticker, deleteSticker } from "graphql/mutations";
import { executeGraphqlRequest, deleteFromS3 } from "libs/awsLib";
import IconButton from "components/Buttons/IconButton/IconButton";
import DeleteItem from "components/Common/DeleteItem/DeleteItem";

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
  const { userInfo } = useSelector((state) => state.user);
  const editIsLocked = userInfo?.data?.lockEdit;
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

  const deleteStickerHandler = async () => {
    await executeGraphqlRequest(deleteSticker, {
      id: sticker.id,
    });

    await deleteFromS3(sticker.source);

    dispatch(removeStickerLocally({ id: sticker.id }));
  };

  return (
    <>
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
        disableDragging={editIsLocked}
        onResizeStop={(e, direction, ref, delta, position) => {
          onResizeHandler({
            newWidth: ref.style.width,
            newHeight: ref.style.height,
          });
        }}
        enableResizing={!editIsLocked}
        onClick={() => setShowBorder(true)}
        style={{
          border: showBorder ? "1px solid black" : "none",
        }}
        className={editIsLocked ? "" : "hoverEffect"}
      >
        <CommonImage
          ref={ref}
          id={sticker.id}
          source={sticker.source}
          draggable="false"
        />
        <DeleteItem
          editIsLocked={editIsLocked}
          deleteHandler={deleteStickerHandler}
        />
      </Rnd>
    </>
  );
};

export default Sticker;
