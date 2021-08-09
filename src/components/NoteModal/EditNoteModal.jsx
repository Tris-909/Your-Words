import React, { useState, useRef } from "react";
import CommonModal from "./CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Image,
  Box,
  ModalFooter,
  Button,
  MenuItem,
} from "@chakra-ui/react";
import LabelInput from "components/Note/components/LabelInput";
import TextEditor from "components/Note/components/TextEditor";
import EmojiPicker from "components/Note/components/EmojiPicker";
import { CloseIcon } from "@chakra-ui/icons";
import { BsPencil } from "react-icons/bs";
import { API, graphqlOperation } from "aws-amplify";
import { onError } from "libs/error-libs";
import { uploadToS3 } from "libs/awsLib";
import config from "config";
import { updateTodo } from "graphql/mutations";
import { useSelector } from "react-redux";

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
  const [previewImage, setPreviewImage] = useState(null);
  const file = useRef(null);
  const { auth } = useSelector((state) => state.user);

  const handleFileChange = (event) => {
    file.current = event.target.files[0];
    setPreviewImage(URL.createObjectURL(event.target.files[0]));
  };

  const clearFileHandler = () => {
    setPreviewImage(null);
    file.current = {};
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

      await API.graphql(
        graphqlOperation(updateTodo, {
          input: {
            id: note.id,
            name: header,
            description: content,
            image: attachment || note.image,
          },
        })
      );
      onClose();
      fetchLists();
    } catch (e) {
      onError(e);
    }
  };

  const onEditHandler = () => {
    setPreviewImage(null);
    file.current = {};
    setCurrentModalState("edit");
    onOpen();
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

              <FormControl>
                <FormLabel marginTop={2}>Content</FormLabel>
                <EmojiPicker content={content} setContent={setContent} />
                <TextEditor content={content} setContent={setContent} />
              </FormControl>

              <LabelInput note={note} />

              <FormControl mt={4}>
                <FormLabel>Image</FormLabel>
                {(previewImage || note.image) && (
                  <HStack alignItems="flex-start">
                    <Image
                      src={
                        !previewImage
                          ? `https://amplifytutorialoneeb71ffcb9e1e4ab09d46e7e344ec4231901-frei.s3.ap-southeast-2.amazonaws.com/private/${auth.data.id}/${note.image}`
                          : previewImage
                      }
                      alt="previewImage"
                      border="1px solid #e2e8f0"
                      width="90%"
                      height="500px"
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

                <input type="file" onChange={handleFileChange} />
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