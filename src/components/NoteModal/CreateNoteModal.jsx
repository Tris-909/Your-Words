import React, { useState, useRef } from "react";
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
  Image,
  HStack,
  Box,
  MenuItem,
} from "@chakra-ui/react";
import { BiNote } from "react-icons/bi";
import BodyNoteEditor from "components/Note/components/BodyNoteEditor";
import { CloseIcon } from "@chakra-ui/icons";
import config from "config";
import { executeGraphqlRequest, uploadToS3 } from "libs/awsLib";
import { onError } from "libs/error-libs";
import { createTodo } from "graphql/mutations";
import { useSelector } from "react-redux";
import * as uuid from "uuid";

const CreateNoteModal = ({
  isOpen,
  onOpen,
  onClose,
  fetchLists,
  modalState,
  setModalState,
}) => {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const file = useRef(null);
  const inputRef = useRef();
  const { userInfo } = useSelector((state) => state.user);

  const handleFileChange = (e) => {
    file.current = e.target.files[0];
    setPreviewImage(URL.createObjectURL(e.target.files[0]));
  };

  const clearInputState = () => {
    setHeader("");
    setContent("");
    file.current = {};
  };

  const clearFileHandler = () => {
    setPreviewImage(null);
    inputRef.current.value = "";
    console.log("file", inputRef.current.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (file.current && file.current.size > config.maxAttachmentSize) {
      alert(
        `Please pick up a file smaller than ${
          config.maxAttachmentSize / 1000000
        } MB`
      );
      return;
    }

    try {
      const attachment = file.current ? await uploadToS3(file.current) : null;

      const note = {
        id: uuid.v1(),
        userId: userInfo.data.id,
        description: content,
        name: header,
        image: attachment ? attachment : "",
        labels: [],
        x: 0,
        y: 0,
      };

      await executeGraphqlRequest(createTodo, note);

      clearInputState();
      fetchLists();
      onClose();
    } catch (error) {
      console.log(error);
      onError(e);
    }
  };

  return (
    <>
      <MenuItem
        icon={<BiNote />}
        onClick={() => {
          onOpen();
          setModalState("createNote");
        }}
      >
        New Note
      </MenuItem>

      {modalState === "createNote" && (
        <CommonModal
          isOpen={isOpen}
          onClose={onClose}
          customeMaxWContent="60rem"
          scrollBehavior="outside"
        >
          <ModalHeader>Create a new note</ModalHeader>
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

              <FormControl mt={25}>
                <FormLabel>Content</FormLabel>
                <BodyNoteEditor content={content} setContent={setContent} />
              </FormControl>

              <FormControl mt={50}>
                <FormLabel>Image</FormLabel>
                {previewImage && (
                  <HStack alignItems="flex-start">
                    <Image
                      src={previewImage}
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
                <input
                  onChange={handleFileChange}
                  type="file"
                  id="file"
                  ref={inputRef}
                />
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
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </CommonModal>
      )}
    </>
  );
};

export default CreateNoteModal;
