import React, { useState } from "react";
import {
  Box,
  Image,
  HStack,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import EditNoteModal from "components/NoteModal/EditNoteModal";
import DetailNoteModal from "components/NoteModal/DetailNoteModal";
import Draggable from "react-draggable";
import { deleteFromS3 } from "libs/awsLib";
import { API } from "aws-amplify";
import { CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import "./Note.scss";

const Note = ({ note, fetchLists }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onHide, setOnHide] = useState(true);
  const [currentModalState, setCurrentModalState] = useState(null);

  const deleteNote = async (noteId, objectKey) => {
    await API.del("notes", `/notes/${noteId}`);
    await deleteFromS3(objectKey);
    fetchLists();
  };

  const savePositionToDatabases = async (data) => {
    await API.put("notes", `/notes/drag/${note.noteId}`, {
      body: {
        x: data.x,
        y: data.y,
      },
    });
  };

  return (
    <Draggable
      onStop={(e, data) => savePositionToDatabases(data)}
      defaultPosition={{ x: note.x, y: note.y }}
      bounds="parent"
    >
      <Box
        width="fit-content"
        minWidth="250px"
        minHeight={note.attachment ? "250px" : "auto"}
        borderRadius="7px"
        background="white"
        className="drag"
      >
        <HStack my={2} paddingLeft={2} width="250px">
          <Box fontWeight="bold" width="100%">
            {note.header}
          </Box>
          <Menu>
            <MenuButton
              as={IconButton}
              aria-label="Options"
              icon={<SettingsIcon className="hoverAnimation" />}
              variant="none"
            />
            <MenuList zIndex="2">
              <EditNoteModal
                note={note}
                isOpen={isOpen}
                onClose={onClose}
                onOpen={onOpen}
                currentModalState={currentModalState}
                setCurrentModalState={setCurrentModalState}
                fetchLists={fetchLists}
              />
              <MenuItem
                icon={<CloseIcon />}
                onClick={() => deleteNote(note.noteId, note.attachment)}
              >
                Delete Note
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        <Box
          width="260px"
          height={note.attachment ? "260px" : "150px"}
          zIndex="1"
          position="relative"
        >
          {note.attachment ? (
            <>
              <Image
                position="absolute"
                objectFit="cover"
                width="100%"
                height="100%"
                src={`https://notes-app-upload-tritran.s3.ap-southeast-2.amazonaws.com/private/${note.userId}/${note.attachment}`}
                alt={note.id}
              />
              <Box
                width="100%"
                height="100%"
                zIndex={2}
                position="absolute"
                backgroundColor="transparent"
                onMouseEnter={() => setOnHide(false)}
                onMouseLeave={() => setOnHide(true)}
              >
                <DetailNoteModal
                  note={note}
                  isOpen={isOpen}
                  onClose={onClose}
                  onOpen={onOpen}
                  onHide={onHide}
                  setOnHide={setOnHide}
                  currentModalState={currentModalState}
                  setCurrentModalState={setCurrentModalState}
                />
              </Box>
            </>
          ) : (
            <Box height="260px" p={2}>
              {note.content}
            </Box>
          )}
        </Box>
      </Box>
    </Draggable>
  );
};

export default Note;
