import React from "react";
import { Box } from "@chakra-ui/react";
import "./Label.scss";

const Label = ({ bgColor, content }) => {
  console.log("content", content.length);

  const firstPart = content.slice(0, 17);
  const secondPart = content.slice(20, content.length);

  return (
    <Box
      className="label"
      width="fit-content"
      maxWidth="150px"
      maxHeight="19.2px"
      overflow="hidden"
      bg={bgColor}
    >
      {`${firstPart} ${secondPart ? "..." : ""}`}
    </Box>
  );
};

export default Label;
