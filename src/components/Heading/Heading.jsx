import React, { useState, useRef } from "react";
import { Box, Text } from "@chakra-ui/react";
import TexInput from "./Input";
import {
  updateHeadingContent,
  updateLocalXYPosition,
} from "redux/features/heading/heading";
import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { updateHeading } from "graphql/mutations";
import Draggable from "react-draggable";

const Heading = ({
  id,
  content,
  positionX,
  positionY,
  headingWidth,
  headingHeight,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(content);
  // const [isEditting, setIsEditting] = useState(content === "");
  const [isEditting, setIsEditting] = useState(true);

  const ActiveInput = () => {
    setIsEditting(true);
  };

  const onRemoveActiveInput = async (e) => {
    // setIsEditting(false);
    setIsEditting(true);
    setInput(e.target.value);
    dispatch(updateHeadingContent(id, e.target.value));

    await API.graphql(
      graphqlOperation(updateHeading, {
        input: {
          id: id,
          content: e.target.value,
        },
      })
    );
  };

  const savePositionToDatabases = async (data) => {
    await API.graphql(
      graphqlOperation(updateHeading, {
        input: {
          id: id,
          x: data.x,
          y: data.y,
        },
      })
    );
    dispatch(updateLocalXYPosition({ id: id, newY: data.y, newX: data.x }));
  };

  return (
    <>
      {isEditting ? (
        // <Draggable
        //   onStop={(e, data) => savePositionToDatabases(data)}
        //   defaultPosition={{ x: positionX, y: positionY }}
        //   bounds="parent"
        // >
        //   <Box width="fit-content" color="white">
        //     <TexInput
        //       input={input}
        //       setInput={setInput}
        //       onRemoveActiveInput={onRemoveActiveInput}
        //     />
        //   </Box>
        // </Draggable>
        <Box width="fit-content" color="white">
          <TexInput
            input={input}
            setInput={setInput}
            onRemoveActiveInput={onRemoveActiveInput}
            headingId={id}
            width={headingWidth}
            height={headingHeight}
          />
        </Box>
      ) : (
        <Draggable
          onStop={(e, data) => savePositionToDatabases(data)}
          defaultPosition={{ x: positionX, y: positionY }}
          bounds="parent"
          disabled={true}
        >
          <Text
            onClick={() => ActiveInput()}
            height="40px"
            width="fit-content"
            display="flex"
            justifyContent="flex-start"
            px={"16px"}
            alignItems="center"
            color="white"
          >
            {input}
          </Text>
        </Draggable>
      )}
    </>
  );
};

export default Heading;
