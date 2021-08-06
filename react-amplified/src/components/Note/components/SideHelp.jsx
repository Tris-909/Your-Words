import React from "react";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import { BiUpArrow, BiWindow } from "react-icons/bi";
import CreateNoteModal from "components/NoteModal/CreateNoteModal";
import { API } from "aws-amplify";
import "./SideHelp.scss";

const SideHelp = ({ isOpen, onOpen, onClose, fetchLists }) => {
  const expandBoard = async () => {
    // await API.post("notes", "/board/create");
    const items = await API.get("notes", "/user");
    console.log("items", items);
  };

  return (
    <Menu>
      <MenuButton
        as={IconButton}
        aria-label="Options"
        icon={<BiUpArrow color="black" />}
        position="sticky"
        top="90%"
        left="95%"
        borderRadius="full"
        className="animation"
      />

      <MenuList>
        <CreateNoteModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          fetchLists={fetchLists}
        />
        <MenuItem icon={<BiWindow />} onClick={expandBoard}>
          Expand Board
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SideHelp;
