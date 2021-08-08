import React, { useState } from "react";
import { Box, Icon, Input } from "@chakra-ui/react";
import { BiX } from "react-icons/bi";
import "./Label.scss";

const Label = (props) => {
  const { bgColor, content, closable, deleteAction } = props;
  const firstPart = content.slice(0, 15);
  const secondPart = content.slice(20, content.length);
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
    }
  };

  return (
    <Box
      className="label"
      width="fit-content"
      maxWidth="175px"
      maxHeight="19.2px"
      overflow="hidden"
      bg={bgColor}
      onClick={() => setIsEditing(true)}
      {...props}
    >
      {isEditing ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="transparent"
        />
      ) : (
        `${firstPart} ${secondPart ? "..." : ""}`
      )}
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
