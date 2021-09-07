import React, { useState } from "react";
import CommonModal from "./CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  ModalFooter,
  Button,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import LabelInput from "components/Note/components/LabelInput";
import BodyNoteEditor from "components/Note/components/BodyNoteEditor";
import { BsPencil } from "react-icons/bs";
import { onError } from "libs/error-libs";
import { uploadToS3, deleteFromS3, executeGraphqlRequest } from "libs/awsLib";
import { updateTodo } from "graphql/mutations";
import UploadImageNote from "components/Note/components/UploadImage";
import CommonImage from "components/Common/Image/Image";

// This is not a re-usable component, This is just a way to manage and swap between many different modals in the same page
const EditNoteModal = ({
  isOpen,
  onOpen,
  onClose,
  note,
  fetchLists,
  currentModalState,
  setCurrentModalState,
}) => {
  const [header, setHeader] = useState(note.name);
  const [content, setContent] = useState(note.description);
  const [images, setImages] = useState([]);
  const [currentImage, setCurrentImage] = useState(note.image);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let imageUploadResult;
      if (currentImage) {
        imageUploadResult = currentImage;
      } else {
        deleteFromS3(currentImage);
        if (images.length > 0) {
          imageUploadResult = await uploadToS3(images[0].file);
        } else {
          imageUploadResult = "";
        }
      }

      const input = {
        id: note.id,
        name: header,
        description: content,
        image: imageUploadResult,
      };

      await executeGraphqlRequest(updateTodo, input);

      onClose();
      fetchLists();
    } catch (e) {
      onError(e);
    }
  };

  const onEditHandler = () => {
    setCurrentModalState("edit");
    setImages([]);
    onOpen();
  };

  const deleteCurrentImage = () => {
    setCurrentImage("");
  };

  return (
    <>
      <MenuItem
        icon={<BsPencil viewBox="0 0 22 22" wdith="1rem" height="1rem" />}
        onClick={() => onEditHandler()}
      >
        Edit Note
      </MenuItem>
      {currentModalState === "edit" && (
        <CommonModal
          isOpen={isOpen}
          onClose={onClose}
          size="xl"
          customeMaxWContent="60rem"
          scrollBehavior="outside"
        >
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <FormControl>
                <FormLabel>Header</FormLabel>
                <Input
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                  placeholder="Note Header"
                />
              </FormControl>

              <FormControl mb={"50px"}>
                <FormLabel marginTop={2}>Content</FormLabel>
                <BodyNoteEditor content={content} setContent={setContent} />
              </FormControl>

              <LabelInput note={note} />

              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                {currentImage && (
                  <Box display="flex" gridGap={4}>
                    <CommonImage
                      source={currentImage}
                      alt="previewImage"
                      border="1px solid #e2e8f0"
                      width="95%"
                      height="400px"
                      padding="10px"
                      marginBottom="20px"
                      objectFit="contain"
                    />
                    <Button
                      color="white"
                      bg="black"
                      p={4}
                      onClick={() => deleteCurrentImage()}
                    >
                      Delete Image
                    </Button>
                  </Box>
                )}

                {!currentImage && (
                  <UploadImageNote images={images} onChange={onChange} />
                )}
              </FormControl>
            </form>
          </ModalBody>

          <ModalFooter>
            <Button
              bg="black"
              color="white"
              mr={3}
              onClick={(e) => handleSubmit(e)}
            >
              Save
            </Button>
          </ModalFooter>
        </CommonModal>
      )}
    </>
  );
};

export default EditNoteModal;
