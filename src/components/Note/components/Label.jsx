import React, { useState, useEffect } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { BiX } from "react-icons/bi";
import { updateSingleLabelContent } from "redux/features/notes/note";
import { useDispatch, useSelector } from "react-redux";
import { useClickOutside } from "react-click-outside-hook";
import { API, graphqlOperation } from "aws-amplify";
import { updateTodo } from "graphql/mutations";
import "./Label.scss";

const Label = (props) => {
  const { bgColor, content, closable, deleteAction, id, noteId } = props;
  const [ref, hasClickedOutside] = useClickOutside();
  const [isEditing, setIsEditing] = useState(false);
  const [editValue, setEditValue] = useState(content);
  const firstPart = content.slice(0, 15);
  const secondPart = content.slice(20, content.length);
  const { list } = useSelector((state) => state.notes);
  const dispatch = useDispatch();

  useEffect(() => {
    if (hasClickedOutside) {
      setIsEditing(false);
    }
  }, [hasClickedOutside]);

  const handleKeyDown = async (event) => {
    if (event.key === "Enter") {
      setIsEditing(false);
      updateLabelContent();
    }
  };

  const updateLabelContent = async () => {
    dispatch(updateSingleLabelContent({ noteId, labelId: id, editValue }));
    await updateLabelContentToDynamoDB();
  };

  const openInput = () => {
    setIsEditing(true);
  };

  const updateLabelContentToDynamoDB = async () => {
    const currentNote = list.data.filter((item) => item.id === noteId);
    const changePosition = currentNote[0].labels.findIndex(
      (item) => item.id === id
    );
    let newLabelList = [...currentNote[0].labels];

    const newLabelItem = {
      id: newLabelList[changePosition].id,
      color: newLabelList[changePosition].color,
      content: editValue,
    };

    newLabelList[changePosition] = newLabelItem;

    await API.graphql(
      graphqlOperation(updateTodo, {
        input: {
          id: noteId,
          labels: newLabelList,
        },
      })
    );
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
