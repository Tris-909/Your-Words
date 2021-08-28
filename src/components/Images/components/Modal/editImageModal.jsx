import React, { useState, useEffect } from "react";
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
  deleteSingleImageInImagesLocally,
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
  const { editImage } = useSelector((state) => state.images);
  const dispatch = useDispatch();
  const [previewImages, setPreviewImages] = useState([]);

  useEffect(() => {
    console.log("previewImages", previewImages);
  }, [previewImages]);

  const handleSubmit = async () => {
    console.log("SUBMIT", previewImages);
    // previewImages [] : NEW IMAGE
    // editImage : OLD IMAGE

    // Looping through current EditImage.data.list to see if any of these previewImages.belongTo ===  EditImage.data.list[i].id
    // If yes, then pushing this previewImage to S3 and change the EditImage.data.list[i].source
    // to the new attachment coming back from S3

    // Submit EditImage to dynamoDB

    // compare current EditImage with the main IMAGE in images to see what item from list get removed to delete it from S3
    // update the image with changed list for redux/images so it can reflect newest changes

    // delete the old one in S3

    // Close Modal
  };

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
