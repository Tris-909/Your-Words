import React, { useState } from "react";
import { Box, Icon } from "@chakra-ui/react";
import TexInput from "./Input";
import {
  updateHeadingContent,
  updateLocalXYPosition,
  updateHeadingColor,
} from "redux/features/heading/heading";
import { useDispatch } from "react-redux";
import { BiPen } from "react-icons/bi";
import { API, graphqlOperation } from "aws-amplify";
import { updateHeading } from "graphql/mutations";
import Draggable from "react-draggable";
import "./Heading.scss";

const Heading = ({
  id,
  content,
  positionX,
  positionY,
  headingWidth,
  headingHeight,
  headingX,
  headingY,
  headingColor,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(content);
  const [isEditting, setIsEditting] = useState(content === "");

  const ActiveInput = () => {
    setIsEditting(true);
  };

  const onRemoveActiveInput = async (mock, color) => {
    setIsEditting(false);
    // dispatch(updateHeadingContent({ id: id, editValue: mock }));
    console.log("color", color);
    dispatch(updateHeadingColor({ id: id, newColor: color }));

    // await API.graphql(
    //   graphqlOperation(updateHeading, {
    //     input: {
    //       id: id,
    //       content: mock,
    //     },
    //   })
    // );
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
        <TexInput
          input={input}
          setInput={setInput}
          onRemoveActiveInput={onRemoveActiveInput}
          headingId={id}
          width={headingWidth}
          height={headingHeight}
          positionx={headingX}
          positiony={headingY}
        />
      ) : (
        <Draggable
          onStop={(e, data) => savePositionToDatabases(data)}
          defaultPosition={{ x: positionX, y: positionY }}
          bounds="parent"
        >
          <Box
            height={`${headingHeight.split("p")[0] * 1 + 40}px `}
            width={`${headingWidth.split("p")[0] * 1 + 55}px `}
            fontSize={`${(headingWidth.split("p")[0] * 1) / 2.5}px `}
            color={headingColor}
            cursor="move"
            display="flex"
            justifyContent="flex-start"
            alignItems="flex-start"
            className="hoverEffect"
          >
            {input}
            <Icon
              as={BiPen}
              onClick={() => ActiveInput()}
              width="32px"
              height="32px"
              p={1}
              borderRadius="full"
              bg="white"
              color="black"
              zIndex="5"
              cursor="pointer"
              className="editButton"
              transition="visibility 0s, opacity 0.25s"
            />
          </Box>
        </Draggable>
      )}
    </>
  );
};

export default Heading;
