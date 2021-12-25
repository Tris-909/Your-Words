import React, { useState, useRef } from "react";
import { useSelector, useDispatch } from "react-redux";
import CommonAudio from "components/Common/Audio/Audio";
import { Rnd } from "react-rnd";
import { updateAudio, deleteAudio } from "graphql/mutations";
import { executeGraphqlRequest, deleteFromS3 } from "libs/awsLib";
import {
  updateAudioPositionLocally,
  removeAudioLocally,
} from "redux/features/audio/audio";
import DeleteItem from "components/Common/DeleteItem/DeleteItem";

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

  const deleteAudioHandler = async () => {
    await executeGraphqlRequest(deleteAudio, {
      id: audio.id,
    });

    await deleteFromS3(audio.source);

    dispatch(removeAudioLocally({ id: audio.id }));
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
      className={editIsLocked ? "" : "hoverEffect"}
    >
      <CommonAudio
        ref={ref}
        editIsLocked={editIsLocked}
        source={audio.source}
      />
      <DeleteItem
        editIsLocked={editIsLocked}
        deleteHandler={() => deleteAudioHandler()}
        right="-15%"
      />
    </Rnd>
  );
};

export default Audio;
