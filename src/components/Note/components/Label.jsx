import React from "react";
import { Box, Icon } from "@chakra-ui/react";
import { BiX } from "react-icons/bi";
import "./Label.scss";

const Label = (props) => {
  const { bgColor, content, closable, deleteAction } = props;
  const firstPart = content.slice(0, 15);
  const secondPart = content.slice(20, content.length);

  return (
    <Box
      className="label"
      width="fit-content"
      maxWidth="175px"
      maxHeight="19.2px"
      overflow="hidden"
      bg={bgColor}
      {...props}
    >
      {`${firstPart} ${secondPart ? "..." : ""}`}
      {closable && (
        <Icon
          as={BiX}
          boxSize={"1.5em"}
          cursor="pointer"
          onClick={deleteAction}
        />
      )}
    </Box>
  );
};

export default Label;
