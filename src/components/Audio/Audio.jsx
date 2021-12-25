import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonAudio from "components/Common/Audio/Audio";
import { Rnd } from "react-rnd";

const Audio = ({ audio }) => {
  const { userInfo } = useSelector((state) => state.user);
  const editIsLocked = userInfo?.data?.lockEdit;
  const dispatch = useDispatch();
  const ref = useRef();
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const onChangePostionHandler = async ({ newX, newY }) => {
    setPosition({
      x: newX,
      y: newY,
    });

    // await executeGraphqlRequest(updateSticker, {
    //   id: sticker.id,
    //   x: newX,
    //   y: newY,
    // });

    // dispatch(updateStickerPositionLocally({ id: sticker.id, newX, newY }));
  };

  return (
    <Rnd
      position={{ x: position.x, y: position.y }}
      bounds="parent"
      onDragStop={(e, d) => {
        setPosition({
          x: d.x,
          y: d.y,
        });
        // onChangePostionHandler({
        //   newX: d.x,
        //   newY: d.y,
        // });
      }}
      disableDragging={false}
      enableResizing={false}
    >
      <CommonAudio
        ref={ref}
        editIsLocked={editIsLocked}
        source={"1640403282338-undefined"}
      />
    </Rnd>
  );
};

export default Audio;
