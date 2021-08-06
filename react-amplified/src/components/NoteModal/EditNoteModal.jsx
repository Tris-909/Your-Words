import React, { useState, useRef } from "react";
import CommonModal from "./CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  HStack,
  Image,
  Box,
  ModalFooter,
  Button,
  MenuItem,
} from "@chakra-ui/react";
import { CloseIcon } from "@chakra-ui/icons";
import { BsPencil } from "react-icons/bs";
import { API } from "aws-amplify";
import { onError } from "libs/error-libs";
import { uploadToS3 } from "libs/awsLib";
import config from "config";

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
  const initialRef = useRef();
  const finalRef = useRef();
  const [header, setHeader] = useState(note.header);
  const [content, setContent] = useState(note.content);
  const [previewImage, setPreviewImage] = useState(null);
  const [deleteImage, setDeleteImage] = useState(false);
  const file = useRef(null);

  const handleFileChange = (event) => {
    file.current = event.target.files[0];
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
    setDeleteImage(false);
  };

  const clearFileHandler = () => {
    setPreviewImage(null);
    file.current = {};
    setDeleteImage(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    let attachment;

    if (file.current && file.current.size > config.MAX_ATTACHMENT_SIZE) {
      alert(
        `Please pick a file smaller than ${
          config.MAX_ATTACHMENT_SIZE / 1000000
        } MB.`
      );
      return;
    }

    try {
      if (file.current.type && file.current.type?.split("/")[0] === "image") {
        attachment = await uploadToS3(file.current);
      }

      await API.put("notes", `/notes/${note.noteId}`, {
        body: {
          header,
          content,
          attachment: attachment || note.attachment,
        },
      });
      onClose();
      fetchLists();
    } catch (e) {
      onError(e);
    }
  };

  const onEditHandler = () => {
    setPreviewImage(null);
    file.current = {};
    setDeleteImage(false);
    setCurrentModalState("edit");
    onOpen();
  };

  return (
    <>
      <MenuItem
        icon={<BsPencil viewBox="0 0 15 15" />}
        onClick={() => onEditHandler()}
      >
        Edit Note
      </MenuItem>
      {currentModalState === "edit" && (
        <CommonModal
          isOpen={isOpen}
          onClose={onClose}
          initialFocusRef={initialRef}
          finalFocusRef={finalRef}
          scrollBehavior="outside"
        >
          <ModalHeader>Edit</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <form>
              <FormControl>
                <FormLabel>Content</FormLabel>
                <Input
                  value={header}
                  onChange={(e) => setHeader(e.target.value)}
                  ref={initialRef}
                  placeholder="Note Header"
                />
              </FormControl>

              <FormControl>
                <FormLabel>Content</FormLabel>
                <Textarea
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  ref={initialRef}
                  placeholder="Write something"
                />
              </FormControl>

              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                {!deleteImage && (
                  <HStack alignItems="flex-start">
                    <Image
                      src={
                        note.attachment && !previewImage
                          ? `https://notes-app-upload-tritran.s3.ap-southeast-2.amazonaws.com/private/${note.userId}/${note.attachment}`
                          : previewImage
                      }
                      alt="previewImage"
                      border="1px solid #e2e8f0"
                      width="350px"
                      height="200px"
                      marginBottom={3}
                    />
                    <Box
                      cursor="pointer"
                      marginInlineStart={0}
                      p={4}
                      border="1px solid #e2e8f0"
                      onClick={() => clearFileHandler()}
                    >
                      <CloseIcon width="16px" height="16px" />
                    </Box>
                  </HStack>
                )}

                <input onChange={handleFileChange} type="file" />
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
