import React from "react";
import CommonModal from "components/NoteModal/CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  MenuItem,
  Box,
  Icon,
} from "@chakra-ui/react";
import { BiHappyHeartEyes } from "react-icons/bi";
import PackOne from "components/Stickers/Pack1/PackOne";

const AddStickerModal = ({
  isOpen,
  onOpen,
  onClose,
  modalState,
  setModalState,
}) => {
  const onSubmitSticker = async (path) => {
    console.log("path", path);

    let blob = await fetch(path).then((response) => response.blob());
    console.log("blob", blob);
    var file = new File([blob], "filename", { type: blob.type });
    console.log("file", file);
    // await uploadToS3(file);
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
