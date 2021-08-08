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
import Label from "components/Note/components/Label";
import Draggable from "react-draggable";
import { deleteFromS3 } from "libs/awsLib";
import { API, graphqlOperation } from "aws-amplify";
import { CloseIcon, SettingsIcon } from "@chakra-ui/icons";
import { deleteTodo, updateTodo } from "graphql/mutations";
import { useSelector, useDispatch } from "react-redux";
import { updateLocalXYPosition } from "redux/features/notes/note";
import "./Note.scss";

const Note = ({ note, fetchLists }) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [onHide, setOnHide] = useState(true);
  const [currentModalState, setCurrentModalState] = useState(null);
  const { auth } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const deleteNote = async (objectKey) => {
    await API.graphql(
      graphqlOperation(deleteTodo, {
        input: {
          id: note.id,
        },
      })
    );
    await deleteFromS3(objectKey);
    fetchLists();
  };

  const savePositionToDatabases = async (data) => {
    await API.graphql(
      graphqlOperation(updateTodo, {
        input: {
          id: note.id,
          x: data.x,
          y: data.y,
        },
      })
    );
    dispatch(
      updateLocalXYPosition({ id: note.id, newY: data.y, newX: data.x })
    );
  };

  return (
    <Draggable
      onStop={(e, data) => savePositionToDatabases(data)}
      defaultPosition={{ x: note.x, y: note.y }}
      bounds="parent"
      disabled={isOpen}
    >
      <Box
        width="fit-content"
        minWidth="250px"
        minHeight={note.image ? "250px" : "auto"}
        borderRadius="7px"
        background="white"
        className="drag"
      >
        <HStack my={2} paddingLeft={2} width="250px">
          <Box fontWeight="bold" width="100%">
            {note.name}
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
                onClick={() => deleteNote(note.image)}
              >
                Delete Note
              </MenuItem>
            </MenuList>
          </Menu>
        </HStack>

        {note.labels && (
          <Box
            display="flex"
            flexWrap="wrap"
            width="250px"
            mx="1"
            marginBottom="0.5rem"
            gridColumnGap="8px"
            gridRowGap="0.5rem"
          >
            {note.labels.map((item) => {
              return (
                <Label
                  key={item.id}
                  content={item.content}
                  bgColor={item.color}
                />
              );
            })}
          </Box>
        )}

        <Box
          width="260px"
          height={note.image ? "260px" : "150px"}
          zIndex="1"
          position="relative"
        >
          {note.image ? (
            <>
              <Image
                position="absolute"
                objectFit="cover"
                width="100%"
                height="100%"
                src={`https://amplifytutorialoneeb71ffcb9e1e4ab09d46e7e344ec4231901-frei.s3.ap-southeast-2.amazonaws.com/private/${auth.data.id}/${note.image}`}
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
              {note.description}
            </Box>
          )}
        </Box>
      </Box>
    </Draggable>
  );
};

export default Note;
