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
} from "@chakra-ui/react";
import { BiNote } from "react-icons/bi";
import UploadImageNote from "components/Note/components/UploadImage";
import BodyNoteEditor from "components/Note/components/BodyNoteEditor";
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
  const [images, setImages] = useState([]);
  const { userInfo } = useSelector((state) => state.user);

  const onChange = (imageList) => {
    setImages(imageList);
  };

  const clearInputState = () => {
    setHeader("");
    setContent("");
    setImages([]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const attachment =
        images.length > 0 ? await uploadToS3(images[0].file) : null;

      const note = {
        id: uuid.v1(),
        userId: userInfo.data.id,
        description: content,
        name: header,
        image: attachment ? attachment : "",
        labels: [],
        x: Math.round(window.innerWidth / 2),
        y: Math.round(window.pageYOffset),
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
                <UploadImageNote images={images} onChange={onChange} />
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
