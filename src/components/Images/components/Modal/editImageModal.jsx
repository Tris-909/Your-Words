import React, { useState } from "react";
import CommonModal from "components/NoteModal/CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Icon,
  Image,
} from "@chakra-ui/react";
import { BiUpload, BiTrash, BiRotateLeft, BiX, BiImages } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
  createImagesLocally,
  loadEditImage,
} from "redux/features/images/images";
import { uploadToS3 } from "libs/awsLib";
import { API, graphqlOperation } from "aws-amplify";
import { createImages } from "graphql/mutations";
import IconButton from "components/Buttons/IconButton/IconButton";
import PreviewEditImage from "components/Images/components/EditImages/editUploadImages";
import * as uuid from "uuid";

const EditImagesModal = ({ isOpen, onOpen, onClose, image }) => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {};

  return (
    <>
      <IconButton
        icon={BiImages}
        onClick={() => {
          dispatch(loadEditImage({ id: image.id }));
          onOpen();
        }}
      />
      <CommonModal
        isOpen={isOpen}
        onClose={onClose}
        customeMaxWContent="60rem"
        scrollBehavior="outside"
      >
        <ModalHeader>Edit Images</ModalHeader>
        <ModalCloseButton />
        <ModalBody pb={6}>
          <Box display="flex" flexDirection="column" gridGap={2}>
            {image.list.map((currentImage) => (
              <Box display="flex">
                <Image
                  key={currentImage.id}
                  width="400px"
                  src={`https://amplifytutorialoneeb71ffcb9e1e4ab09d46e7e344ec4231901-frei.s3.ap-southeast-2.amazonaws.com/private/ap-southeast-2%3A6f82b9fd-9b91-471a-850b-31f48b226aa7/${currentImage.source}`}
                />
                <PreviewEditImage parentId={image.id} id={currentImage.id} />
              </Box>
            ))}
          </Box>
        </ModalBody>
        <ModalFooter>
          <Button
            bg="black"
            color="white"
            mr={3}
            onClick={() => {
              handleSubmit();
            }}
          >
            Save
          </Button>
          <Button onClick={onClose}>Cancel</Button>
        </ModalFooter>
      </CommonModal>
    </>
  );
};

export default EditImagesModal;
