import React, { useState, useEffect } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { BiX } from "react-icons/bi";
import { updateSingleLabelContent } from "redux/features/notes/note";
import { useDispatch } from "react-redux";
import { useClickOutside } from "react-click-outside-hook";
import "./Label.scss";

const Label = (props) => {
  const { bgColor, content, closable, deleteAction, id, noteId } = props;
  const [ref, hasClickedOutside] = useClickOutside();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const firstPart = content.slice(0, 15);
  const secondPart = content.slice(20, content.length);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasClickedOutside) {
      setIsEditing(false);
      dispatch(updateSingleLabelContent({ noteId, labelId: id, editValue }));
    }
  }, [hasClickedOutside]);

  const handleKeyDown = (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      dispatch(updateSingleLabelContent({ noteId, labelId: id, editValue }));
    }
  };

  const openInput = () => {
    setIsEditing(true);
  };

  return (
    <Box
      className="label"
      ref={ref}
      width="fit-content"
      maxWidth="175px"
      maxHeight="19.2px"
      overflow="hidden"
      bg={bgColor}
      onClick={() => openInput()}
      {...props}
    >
      {isEditing ? (
        <input
          value={editValue}
          onChange={(e) => setEditValue(e.target.value)}
          onKeyDown={handleKeyDown}
          className="transparent"
          autoFocus
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
