import React from "react";
import {
  Menu,
  MenuButton,
  IconButton,
  MenuList,
  MenuItem,
  useToast,
} from "@chakra-ui/react";
import {
  BiUpArrow,
  BiMessageSquareAdd,
  BiMessageSquareMinus,
  BiError,
  BiText,
  BiImageAdd,
} from "react-icons/bi";
import CreateNoteModal from "components/NoteModal/CreateNoteModal";
import { ToastBody } from "components/Toast";
import { API, graphqlOperation } from "aws-amplify";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "graphql/mutations";
import { getUserInfo } from "redux/features/user/userInfo";
import { createHeadingThunk } from "redux/features/heading/heading";
import "./SideHelp.scss";

const SideHelp = ({ isOpen, onOpen, onClose, fetchLists }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.notes);
  const dispatch = useDispatch();
  const toast = useToast();

  const changeBoardHeight = async (action) => {
    let changes;
    if (action === "increase") {
      changes = {
        id: userInfo.data.id,
        boardHeight: userInfo.data.boardHeight + 1000,
      };
      updateBoardHeight(changes);
    } else if (action === "decrease" && userInfo.data.boardHeight > 1000) {
      const eligibleForShrink = canReduceBoardHeight();

      changes = {
        id: userInfo.data.id,
        boardHeight: userInfo.data.boardHeight - 1000,
      };

      if (eligibleForShrink) {
        updateBoardHeight(changes);
      }
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

  const canReduceBoardHeight = () => {
    const LIMIT = userInfo.data.boardHeight - 1000;
    let result = true;

    list.data.forEach((item) => {
      if (item.y > LIMIT) {
        toast({
          position: "top-right",
          duration: "30000",
          render: () => (
            <ToastBody
              color="white"
              bg="#e85151"
              icon={BiError}
              content="There are notes on the zone you want to delete"
            />
          ),
        });
        result = false;
      }
    });

    return result;
  };

  const addHeading = () => {
    dispatch(createHeadingThunk(userInfo.data.id));
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
          icon={<BiText viewBox="0 0 22 22" wdith="1rem" height="1rem" />}
          onClick={() => addHeading()}
        >
          Add Heading
        </MenuItem>
        <MenuItem
          icon={<BiImageAdd viewBox="0 0 22 22" wdith="1rem" height="1rem" />}
          // onClick={() => addHeading()}
        >
          Add Images
        </MenuItem>
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
