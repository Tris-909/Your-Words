import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonAudio from "components/Common/Audio/Audio";
import { Rnd } from "react-rnd";
import { updateAudio } from "graphql/mutations";
import { executeGraphqlRequest, deleteFromS3 } from "libs/awsLib";
import { updateAudioPositionLocally } from "redux/features/audio/audio";

const Audio = ({ audio }) => {
  const { userInfo } = useSelector((state) => state.user);
  const editIsLocked = userInfo?.data?.lockEdit;
  const dispatch = useDispatch();
  const ref = useRef();
  const [position, setPosition] = useState({
    x: audio.x,
    y: audio.y,
  });

  const onChangePostionHandler = async ({ newX, newY }) => {
    setPosition({
      x: newX,
      y: newY,
    });

    await executeGraphqlRequest(updateAudio, {
      id: audio.id,
      x: newX,
      y: newY,
    });

    dispatch(updateAudioPositionLocally({ id: audio.id, newX, newY }));
  };

  return (
    <Rnd
      position={{ x: position.x, y: position.y }}
      bounds="parent"
      onDragStop={(e, d) => {
        onChangePostionHandler({
          newX: d.x,
          newY: d.y,
        });
      }}
      disableDragging={editIsLocked}
      enableResizing={false}
    >
      <CommonAudio
        ref={ref}
        editIsLocked={editIsLocked}
        source={audio.source}
      />
    </Rnd>
  );
};

export default Audio;
