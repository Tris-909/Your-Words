import React, { useState } from "react";
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
  BiLockAlt,
  BiLockOpenAlt,
} from "react-icons/bi";
import CreateNoteModal from "components/NoteModal/CreateNoteModal";
import CreateImagesModal from "components/Images/components/Modal/createImageModal";
import CreateStickerModal from "components/Stickers/components/SideHelpComponent/AddStickerModal";
import { ToastBody } from "components/Toast";
import { executeGraphqlRequest } from "libs/awsLib";
import { reduceBoardHeight } from "libs/reduceBoardHeight";
import { useSelector, useDispatch } from "react-redux";
import { updateUser } from "graphql/mutations";
import { getUserInfo } from "redux/features/user/userInfo";
import { createHeadingThunk } from "redux/features/heading/heading";
import "./SideHelp.scss";

const SideHelp = ({ isOpen, onOpen, onClose, fetchLists }) => {
  const { userInfo } = useSelector((state) => state.user);
  const { list } = useSelector((state) => state.notes);
  const { headings } = useSelector((state) => state.headings);
  const { images } = useSelector((state) => state.images);
  const [modalState, setModalState] = useState("");
  const dispatch = useDispatch();
  const toast = useToast();
  const oneBoardStep = 1400;

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
    await executeGraphqlRequest(updateUser, changes);
    dispatch(getUserInfo(userInfo.data.username));
  };

  const canReduceBoardHeight = () => {
    const limit = userInfo.data.boardHeight - oneBoardStep;
    const { result, message } = reduceBoardHeight(
      limit,
      list.data,
      headings.data,
      images.data
    );

    if (!result) {
      toast({
        position: "top-right",
        duration: "30000",
        render: () => (
          <ToastBody
            color="white"
            bg="#e85151"
            icon={BiError}
            content={message}
          />
        ),
      });
    }

    return result;
  };

  const addHeading = () => {
    dispatch(createHeadingThunk(userInfo.data.id));
  };

  const toggleEditMode = async (mode) => {
    if (mode === "disable") {
      const changes = {
        id: userInfo.data.id,
        lockEdit: true,
      };
      await executeGraphqlRequest(updateUser, changes);
      dispatch(getUserInfo(userInfo.data.username));
    } else {
      const changes = {
        id: userInfo.data.id,
        lockEdit: false,
      };
      await executeGraphqlRequest(updateUser, changes);
      dispatch(getUserInfo(userInfo.data.username));
    }
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
          modalState={modalState}
          setModalState={setModalState}
        />
        <MenuItem
          icon={<BiText viewBox="0 0 22 22" wdith="1rem" height="1rem" />}
          onClick={() => addHeading()}
        >
          Add Heading
        </MenuItem>
        <CreateImagesModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          modalState={modalState}
          setModalState={setModalState}
        />
        <CreateStickerModal
          isOpen={isOpen}
          onOpen={onOpen}
          onClose={onClose}
          modalState={modalState}
          setModalState={setModalState}
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
        {userInfo?.data?.lockEdit ? (
          <MenuItem
            icon={
              <BiLockOpenAlt viewBox="0 0 22 22" wdith="1rem" height="1rem" />
            }
            onClick={() => toggleEditMode("enable")}
          >
            Enable Edit
          </MenuItem>
        ) : (
          <MenuItem
            icon={<BiLockAlt viewBox="0 0 22 22" wdith="1rem" height="1rem" />}
            onClick={() => toggleEditMode("disable")}
          >
            Disable Edit
          </MenuItem>
        )}
      </MenuList>
    </Menu>
  );
};

export default SideHelp;
