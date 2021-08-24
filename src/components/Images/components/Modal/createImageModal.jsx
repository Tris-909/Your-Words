import React from "react";
import CommonModal from "components/NoteModal/CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  MenuItem,
} from "@chakra-ui/react";
import { BiImageAdd } from "react-icons/bi";
import ImageUploading from "react-images-uploading";

const CreateImagesModal = ({
  isOpen,
  onOpen,
  onClose,
  modalState,
  setModalState,
}) => {
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <>
      <MenuItem
        icon={<BiImageAdd />}
        onClick={() => {
          onOpen();
          setModalState("createImages");
        }}
      >
        Add Images
      </MenuItem>

      {modalState === "createImages" && (
        <CommonModal
          isOpen={isOpen}
          onClose={onClose}
          customeMaxWContent="60rem"
          scrollBehavior="outside"
        >
          <ModalHeader>Adding Images</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}></ModalBody>

          <ModalFooter>
            <Button
              bg="black"
              color="white"
              mr={3}
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </CommonModal>
      )}
    </>
  );
};

export default CreateImagesModal;
