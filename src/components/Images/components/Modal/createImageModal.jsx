import React, { useState } from "react";
import CommonModal from "components/NoteModal/CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  MenuItem,
  Box,
  Icon,
} from "@chakra-ui/react";
import { BiImageAdd, BiUpload, BiTrash } from "react-icons/bi";
import ImageUploading from "react-images-uploading";

const CreateImagesModal = ({
  isOpen,
  onOpen,
  onClose,
  modalState,
  setModalState,
}) => {
  const [images, setImages] = useState([]);

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

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
          <ModalBody pb={6}>
            <ImageUploading
              multiple
              value={images}
              onChange={onChange}
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
                // write your building UI
                <div className="upload__image-wrapper">
                  <Box display="flex" gridGap="2">
                    <Box
                      style={isDragging ? { color: "red" } : undefined}
                      onClick={onImageUpload}
                      width="90%"
                      height="250px"
                      color="white"
                      bg="#2c3333"
                      cusror="pointer"
                      display="flex"
                      justifyContent="center"
                      {...dragProps}
                    >
                      <Box
                        width="100%"
                        display="flex"
                        margin={4}
                        border="2px dashed white"
                        justifyContent="center"
                        alignItems="center"
                        flexDirection="column"
                      >
                        <Icon
                          as={BiUpload}
                          color="white"
                          width="50px"
                          height="50px"
                        />
                        <Box>Choose an Image or drag it here</Box>
                      </Box>
                    </Box>
                    <Box width="10%">
                      <Box
                        width="fit-content"
                        bg="#2c3333"
                        borderRadius="full"
                        cursor="pointer"
                        onClick={onImageRemoveAll}
                      >
                        <Icon
                          as={BiTrash}
                          color="white"
                          width="36px"
                          height="36px"
                          p={2}
                        />
                      </Box>
                    </Box>
                  </Box>
                  &nbsp;
                  {imageList.map((image, index) => (
                    <div key={index} className="image-item">
                      <img src={image["data_url"]} alt="" width="100" />
                      <div className="image-item__btn-wrapper">
                        <button onClick={() => onImageUpdate(index)}>
                          Update
                        </button>
                        <button onClick={() => onImageRemove(index)}>
                          Remove
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </ImageUploading>
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

export default CreateImagesModal;
