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
  Image,
  Icon,
  Tooltip,
} from "@chakra-ui/react";
import LabelInput from "components/Note/components/LabelInput";
import BodyNoteEditor from "components/Note/components/BodyNoteEditor";
import { BsPencil } from "react-icons/bs";
import { BiPlus, BiX } from "react-icons/bi";
import { onError } from "libs/error-libs";
import { uploadToS3, executeGraphqlRequest } from "libs/awsLib";
import { updateTodo } from "graphql/mutations";
import ImageUploading from "react-images-uploading";

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

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      let attachment;
      if (images.length > 0) {
        attachment = await uploadToS3(images[0].file);
      }

      const input = {
        id: note.id,
        name: header,
        description: content,
        image: attachment || note.image,
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
                <ImageUploading
                  multiple
                  value={images}
                  onChange={onChange}
                  maxNumber={1}
                  dataURLKey="data_url"
                >
                  {({
                    imageList,
                    onImageUpload,
                    onImageRemoveAll,
                    onImageUpdate,
                    onImageRemove,
                    isDragging,
                    dragProps,
                  }) => (
                    <Box
                      display="flex"
                      width="100%"
                      className="upload__image-wrapper"
                    >
                      <Box display="flex" flexDirection="column" w="100%">
                        <Tooltip
                          label="Add more images"
                          aria-label="A tooltip"
                          placement="right-start"
                        >
                          <Button
                            onClick={() => {
                              if (images.length === 0) {
                                onImageUpload();
                              }
                            }}
                            bg={images.length === 1 ? "#adaaaa" : "black"}
                            cursor={
                              images.length === 1 ? "not-allowed" : "pointer"
                            }
                            color="white"
                            alignSelf="center"
                            width="80px"
                            height="80px"
                            clipPath="polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                            mb="8"
                            {...dragProps}
                          >
                            <Icon as={BiPlus} width="36px" height="36px" />
                          </Button>
                        </Tooltip>

                        <Box display="flex" flexDirection="column" gridGap="2">
                          {imageList.map((image, index) => (
                            <Box
                              display="flex"
                              key={index}
                              className="image-item"
                            >
                              <Image
                                src={image["data_url"]}
                                alt=""
                                width="100%"
                                height="500px"
                              />
                              <Button
                                onClick={() => {
                                  onImageRemove(index);
                                }}
                                bg="black"
                                color="white"
                                _hover={{
                                  bg: "#363533",
                                }}
                                ml={4}
                                {...dragProps}
                              >
                                <Icon as={BiX} width="36px" height="36px" />
                              </Button>
                            </Box>
                          ))}
                        </Box>
                      </Box>
                    </Box>
                  )}
                </ImageUploading>
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
