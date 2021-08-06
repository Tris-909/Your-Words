import React from "react";
import CommonModal from "./CommonModal";
import { ModalHeader, ModalBody, Box, Image } from "@chakra-ui/react";
import { Search2Icon } from "@chakra-ui/icons";

const DetailNoteModal = ({
  isOpen,
  onOpen,
  onClose,
  onHide,
  setOnHide,
  note,
  setCurrentModalState,
  currentModalState,
}) => {
  const onOpenDetailModal = () => {
    setOnHide(true);
    setCurrentModalState("detail");
    onOpen();
  };

  return (
    <Box
      position="relative"
      left="40%"
      top="40%"
      width="48px"
      height="48px"
      bg="#2e2f30"
      borderRadius="full"
      transition="visibility 0s, opacity 0.5s"
      visibility={onHide ? "hidden" : "visible"}
      opacity={onHide ? 0 : 0.7}
      cursor="pointer"
      onClick={onOpenDetailModal}
    >
      <Search2Icon
        color="white"
        marginInlineEnd="0px"
        position="absolute"
        top="34%"
        left="33%"
      />
      {currentModalState === "detail" && (
        <CommonModal
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
          customeMaxWContent="60rem"
          scrollBehavior="outside"
        >
          <Image
            src={
              note.attachment &&
              `https://notes-app-upload-tritran.s3.ap-southeast-2.amazonaws.com/private/${note.userId}/${note.attachment}`
            }
            alt="previewImage"
            border="1px solid #e2e8f0"
            width="100%"
            height="500px"
            marginBottom={3}
          />
          <ModalHeader>{note.header}</ModalHeader>
          <ModalBody whiteSpace="pre-line">{note.content}</ModalBody>
        </CommonModal>
      )}
    </Box>
  );
};

export default DetailNoteModal;
