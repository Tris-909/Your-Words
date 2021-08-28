import React, { useState } from "react";
import CommonModal from "components/NoteModal/CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  Box,
  Image,
} from "@chakra-ui/react";
import { BiImages } from "react-icons/bi";
import { useSelector, useDispatch } from "react-redux";
import {
  syncEditImageWithImages,
  loadEditImage,
  updateEditImageListItem,
} from "redux/features/images/images";
import { uploadToS3, deleteFromS3 } from "libs/awsLib";
import { API, graphqlOperation } from "aws-amplify";
import { updateImages } from "graphql/mutations";
import IconButton from "components/Buttons/IconButton/IconButton";
import PreviewEditImage from "components/Images/components/EditImages/editUploadImages";

const EditImagesModal = ({ isOpen, onOpen, onClose, image }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { editImage } = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const [previewImages, setPreviewImages] = useState([]);

  const handleSubmit = async () => {
    for (let i = 0; i < previewImages.length; i++) {
      for (let u = 0; u < editImage.data.list.length; u++) {
        if (previewImages[i].belongTo === editImage.data.list[u].id) {
          const attachment = await uploadToS3(
            previewImages[i].imageList[0].file
          );
          dispatch(
            updateEditImageListItem({
              imageID: previewImages[i].belongTo,
              newSource: attachment,
            })
          );
          await deleteFromS3(editImage.data.list[u].source);
        }
      }
    }

    await API.graphql(
      graphqlOperation(updateImages, {
        input: {
          id: image.id,
          list: editImage.data.list,
        },
      })
    );

    dispatch(syncEditImageWithImages({ id: image.id }));
    setPreviewImages([]);
    onClose();
  };

  return (
    <>
      <IconButton
        as={BiImages}
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
            {editImage.data.list &&
              editImage.data.list.map((currentImage) => (
                <Box display="flex" key={currentImage.id}>
                  <Image
                    key={currentImage.id}
                    width="400px"
                    src={`https://amplifytutorialoneeb71ffcb9e1e4ab09d46e7e344ec4231901-frei.s3.ap-southeast-2.amazonaws.com/private/ap-southeast-2%3A6f82b9fd-9b91-471a-850b-31f48b226aa7/${currentImage.source}`}
                  />
                  <PreviewEditImage
                    id={currentImage.id}
                    previewImages={previewImages}
                    setPreviewImages={setPreviewImages}
                  />
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
        </ModalFooter>
      </CommonModal>
    </>
  );
};

export default EditImagesModal;
