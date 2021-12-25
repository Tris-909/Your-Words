import React, { useState, useCallback } from "react";
import CommonModal from "components/NoteModal/CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter,
  Button,
  MenuItem,
  Box,
} from "@chakra-ui/react";
import { BiUserVoice, BiX, BiUpload } from "react-icons/bi";
import { useDropzone } from "react-dropzone";
import ReactPlayer from "react-player";
import IconButton from "components/Buttons/IconButton/IconButton";
import { uploadToS3, executeGraphqlRequest } from "libs/awsLib";
import { createAudio } from "graphql/mutations";
import { useSelector, useDispatch } from "react-redux";
import { createAudioLocally } from "redux/features/audio/audio";
import * as uuid from "uuid";

const CreateAudioModal = ({
  isOpen,
  onOpen,
  onClose,
  modalState,
  setModalState,
}) => {
  const [previewURL, setPreviewURL] = useState(null);
  const [audioFile, setAudioFile] = useState(null);
  const onDrop = useCallback((acceptedFiles) => {
    setPreviewURL(URL.createObjectURL(acceptedFiles[0]));
    setAudioFile(acceptedFiles[0]);
  }, []);
  const { getRootProps, getInputProps } = useDropzone({ onDrop });
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const handleSubmit = async () => {
    const attachment = await uploadToS3(audioFile);

    const audioForDynamoDB = {
      id: uuid.v1(),
      userId: userInfo.data.id,
      type: "AUDIO",
      source: attachment,
      x: Math.round(window.innerWidth / 2),
      y: Math.round(window.pageYOffset),
    };
    await executeGraphqlRequest(createAudio, audioForDynamoDB);
    dispatch(createAudioLocally({ createdAudio: audioForDynamoDB }));

    setPreviewURL(null);
    setAudioFile(null);
    onClose();
  };

  return (
    <>
      <MenuItem
        icon={<BiUserVoice />}
        onClick={() => {
          onOpen();
          setModalState("createAudio");
        }}
      >
        Upload Audio
      </MenuItem>

      {modalState === "createAudio" && (
        <CommonModal
          isOpen={isOpen}
          onClose={onClose}
          customeMaxWContent="60rem"
          scrollBehavior="outside"
        >
          <ModalHeader>Upload a new audio</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            {!previewURL && (
              <div {...getRootProps()} style={{ width: "150px" }}>
                <input {...getInputProps()} />
                <Button
                  leftIcon={<BiUpload />}
                  color="black"
                  border="1px"
                  width="150px"
                >
                  Upload Audio
                </Button>
              </div>
            )}

            {previewURL && (
              <Box
                mt="10"
                display="flex"
                flexDirection="row"
                justifyContent={"flex-start"}
                alignItems={"center"}
              >
                <ReactPlayer
                  url={previewURL}
                  width="400px"
                  height="50px"
                  playing={false}
                  controls={true}
                />
                <IconButton
                  as={BiX}
                  width="35px"
                  height="35px"
                  cursor="pointer"
                  onClick={() => {
                    setPreviewURL(null);
                    setAudioFile(null);
                  }}
                />
              </Box>
            )}
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

export default CreateAudioModal;
