import React from "react";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
} from "@chakra-ui/react";
import {
  BiUpArrow,
  BiMessageSquareAdd,
  BiMessageSquareMinus,
} from "react-icons/bi";
import CreateNoteModal from "components/NoteModal/CreateNoteModal";
import { API, graphqlOperation } from "aws-amplify";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "graphql/mutations";
import { getUserInfo } from "redux/features/user/userInfo";
import "./SideHelp.scss";

const SideHelp = ({ isOpen, onOpen, onClose, fetchLists }) => {
  const { userInfo } = useSelector((state) => state.user);
  const dispatch = useDispatch();

  const changeBoardHeight = async (action) => {
    let changes;
    if (action === "increase") {
      changes = {
        id: userInfo.data.id,
        boardHeight: userInfo.data.boardHeight + 100,
      };
      updateBoardHeight(changes);
    } else if (action === "decrease" && userInfo.data.boardHeight > 100) {
      changes = {
        id: userInfo.data.id,
        boardHeight: userInfo.data.boardHeight - 100,
      };
      updateBoardHeight(changes);
    }
  };

  const updateBoardHeight = async (changes) => {
    await API.graphql(
      graphqlOperation(updateUser, {
        input: changes,
      })
    );
    dispatch(getUserInfo(userInfo.data.username));
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
        <MenuItem
          icon={
            <BiMessageSquareAdd
              viewBox="0 0 22 22"
              wdith="1rem"
              height="1rem"
            />
          }
          onClick={() => changeBoardHeight("increase")}
        >
          Expand Board
        </MenuItem>
        <MenuItem
          icon={
            <BiMessageSquareMinus
              viewBox="0 0 22 22"
              wdith="1rem"
              height="1rem"
            />
          }
          isDisabled={userInfo.data && userInfo.data.boardHeight === 100}
          onClick={() => changeBoardHeight("decrease")}
        >
          Shrink Board
        </MenuItem>
      </MenuList>
    </Menu>
  );
};

export default SideHelp;
