import React from "react";
import { Box } from "@chakra-ui/react";
import IconButton from "components/Buttons/IconButton/IconButton";
import { BiTrash } from "react-icons/bi";

const DeleteItem = ({ editIsLocked, deleteHandler, right }) => {
  if (!editIsLocked) {
    return (
      <Box
        display="flex"
        flexDirection="column"
        alignItems="flex-end"
        width="115%"
        gridGap={4}
        position="absolute"
        top="0%"
        right={right ? right : "-25%"}
        zIndex="-1"
        cursor="initial"
      >
        <IconButton as={BiTrash} onClick={() => deleteHandler()} />
      </Box>
    );
  }

  return null;
};

export default DeleteItem;
