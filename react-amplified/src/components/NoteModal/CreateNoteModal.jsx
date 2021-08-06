import React, { useState, useRef, useEffect } from "react";
import CommonModal from "./CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  ModalFooter,
  Button,
  Image,
  HStack,
  Box,
  MenuItem,
} from "@chakra-ui/react";
import { BiNote } from "react-icons/bi";
import { CloseIcon } from "@chakra-ui/icons";
import config from "config";
import { Auth, API, graphqlOperation } from "aws-amplify";
import { uploadToS3 } from "libs/awsLib";
import { onError } from "libs/error-libs";
import { createTodo } from "graphql/mutations";
import * as uuid from "uuid";

const CreateNoteModal = ({ isOpen, onOpen, onClose, fetchLists }) => {
  const [header, setHeader] = useState("");
  const [content, setContent] = useState("");
  const [previewImage, setPreviewImage] = useState(null);
  const file = useRef(null);
  const inputRef = useRef();
  const [userInfo, setUserInfo] = useState(null);

  useEffect(() => {
    getUserInfo();
  }, []);

  const getUserInfo = async () => {
    await Auth.currentUserInfo()
      .then((data) => {
        setUserInfo(data);
      })
      .catch((err) => {
        console.log(err);
      });
  };

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

  // const createNote = (note) => {
  //   return API.post("notes", "/notes", {
  //     body: note,
  //   });
  // };

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
        userId: userInfo.id,
        content: content,
        header: header,
        attachment: attachment ? attachment : "",
        x: 0,
        y: 0,
      };

      await API.graphql(graphqlOperation(createTodo, { input: note }));

      // await createNote({ header, content, attachment });
      clearInputState();
      fetchLists();
      onClose();
    } catch (error) {
      console.log(error);
      onError(e);
    }
  };

  console.log("user info", userInfo);

  return (
    <>
      <MenuItem icon={<BiNote />} onClick={onOpen}>
        New Note
      </MenuItem>

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
              <FormLabel>Content</FormLabel>
              <Input
                value={header}
                onChange={(e) => setHeader(e.target.value)}
                placeholder="Note Header"
              />
            </FormControl>

            <FormControl>
              <FormLabel>Content</FormLabel>
              <Textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Write something"
              />
            </FormControl>

            <FormControl mt={4}>
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
    </>
  );
};

export default CreateNoteModal;
