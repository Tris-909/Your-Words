import React from "react";
import CommonModal from "components/NoteModal/CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  MenuItem,
} from "@chakra-ui/react";
import { BiHappyHeartEyes } from "react-icons/bi";
import PackOne from "components/Stickers/Pack1/PackOne";
import { useSelector, useDispatch } from "react-redux";
import { addStickerLocally } from "redux/features/stickers/sticker";
import { uploadToS3, executeGraphqlRequest } from "libs/awsLib";
import { createSticker } from "graphql/mutations";
import * as uuid from "uuid";

const AddStickerModal = ({
  isOpen,
  onOpen,
  onClose,
  modalState,
  setModalState,
}) => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const onSubmitSticker = async (path) => {
    const blob = await fetch(path).then((response) => response.blob());
    const file = new File([blob], "filename", { type: blob.type });
    const source = await uploadToS3(file);

    const newSticker = {
      id: uuid.v1(),
      userId: userInfo.data.id,
      source: source,
      type: "STICKER",
      x: Math.round(window.innerWidth / 2),
      y: Math.round(window.pageYOffset),
      width: "150px",
      height: "150px",
    };

    await executeGraphqlRequest(createSticker, newSticker);
    dispatch(addStickerLocally({ newSticker: newSticker }));
  };

  return (
    <>
      <MenuItem
        icon={<BiHappyHeartEyes />}
        onClick={() => {
          onOpen();
          setModalState("createStickers");
        }}
      >
        Add Sticker
      </MenuItem>

      {modalState === "createStickers" && (
        <CommonModal
          isOpen={isOpen}
          onClose={onClose}
          customeMaxWContent="60rem"
          scrollBehavior="outside"
        >
          <ModalHeader>Choose A Sticker</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <PackOne onSubmitSticker={onSubmitSticker} />
          </ModalBody>
        </CommonModal>
      )}
    </>
  );
};

export default AddStickerModal;
