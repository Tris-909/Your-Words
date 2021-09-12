import React, { useState } from "react";
import CommonModal from "components/NoteModal/CommonModal";
import {
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  MenuItem,
  Box,
  Divider,
  Image,
} from "@chakra-ui/react";
import { BiHappyHeartEyes } from "react-icons/bi";
import PackOne from "components/Stickers/Pack1/PackOne";
import PackTwo from "components/Stickers/Pack2/Pack2";
import PackThree from "components/Stickers/Pack3/Pack3";
import { useSelector, useDispatch } from "react-redux";
import { addStickerLocally } from "redux/features/stickers/sticker";
import { uploadToS3, executeGraphqlRequest } from "libs/awsLib";
import { createSticker } from "graphql/mutations";
import * as uuid from "uuid";

import PackOneSticker from "components/Stickers/Pack1/creativity(11).png";
import PackTwoSticker from "components/Stickers/Pack2/bees.png";
import PackThreeSticker from "components/Stickers/Pack3/dream.png";

const PackButton = ({ packSrc, onClickHandler }) => {
  return (
    <Image
      src={packSrc}
      alt="PackOne"
      w="150px"
      h="150px"
      onClick={() => onClickHandler()}
    />
  );
};

const AddStickerModal = ({
  isOpen,
  onOpen,
  onClose,
  modalState,
  setModalState,
}) => {
  const { userInfo } = useSelector((state) => state.user);
  const [packIndex, setPackIndex] = useState(0);
  const packButtonImages = [PackOneSticker, PackTwoSticker, PackThreeSticker];
  const dispatch = useDispatch();

  const onSubmitSticker = async (path) => {
    const blob = await fetch(path).then((response) => response.blob());
    const file = new File([blob], "filename", { type: blob.type });
    const source = await uploadToS3(file);

    const newSticker = {
      id: uuid.v1(),
      userId: userInfo.data.id,
      source: source,
      type: "STICKER",
      x: Math.round(window.innerWidth / 2),
      y: Math.round(window.pageYOffset),
      width: "150px",
      height: "150px",
    };

    await executeGraphqlRequest(createSticker, newSticker);
    dispatch(addStickerLocally({ newSticker: newSticker }));
    onClose();
  };

  return (
    <>
      <MenuItem
        icon={<BiHappyHeartEyes />}
        onClick={() => {
          onOpen();
          setModalState("createStickers");
        }}
      >
        Add Sticker
      </MenuItem>

      {modalState === "createStickers" && (
        <CommonModal
          isOpen={isOpen}
          onClose={onClose}
          customeMaxWContent="60rem"
          scrollBehavior="outside"
        >
          <ModalHeader>Choose A Sticker</ModalHeader>
          <ModalCloseButton />

          <ModalBody pb={6}>
            <Box display="flex" justifyContent="center" gridGap={5}>
              {packButtonImages.map((item, index) => {
                return (
                  <PackButton
                    packSrc={item}
                    onClickHandler={() => setPackIndex(index)}
                  />
                );
              })}
            </Box>
            <Divider mt={3} />
            {packIndex === 0 && <PackOne onSubmitSticker={onSubmitSticker} />}
            {packIndex === 1 && <PackTwo onSubmitSticker={onSubmitSticker} />}
            {packIndex === 2 && <PackThree onSubmitSticker={onSubmitSticker} />}
          </ModalBody>
        </CommonModal>
      )}
    </>
  );
};

export default AddStickerModal;
