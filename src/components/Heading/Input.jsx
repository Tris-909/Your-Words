import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { Input, Button, Box, Icon, VStack } from "@chakra-ui/react";
import { updateLocalWidthHeight } from "redux/features/heading/heading";
import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { updateHeading } from "graphql/mutations";
import { BiCheck } from "react-icons/bi";
import ColorPicker from "./ColorPicker";
import "./Heading.scss";

const TextInput = ({
  input,
  setInput,
  onRemoveActiveInput,
  headingId,
  width,
  height,
  positionx,
  positiony,
}) => {
  const inputRef = useRef(null);
  const [size, setSize] = useState({
    width: width,
    height: height,
  });
  const [mock, setMock] = useState(input);
  const [color, setColor] = useState("#ffffff");
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const updateWidthAndHeightDynamoDB = async (newWidth, newHeight) => {
    await API.graphql(
      graphqlOperation(updateHeading, {
        input: {
          id: headingId,
          width: newWidth,
          height: newHeight,
        },
      })
    );
  };

  const changeValue = (e) => {
    setInput(e.target.value);
    setMock(e.target.value);
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: positionx, y: positiony }}
      bounds="parent"
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        });

        dispatch(
          updateLocalWidthHeight({
            id: headingId,
            newWidth: ref.style.width,
            newHeight: ref.style.height,
          })
        );

        updateWidthAndHeightDynamoDB(ref.style.width, ref.style.height);
      }}
      disableDragging={true}
      style={{
        display: "flex",
        border: "2px solid white",
        position: "relative",
        borderRadius: "5px",
      }}
    >
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => changeValue(e)}
        width="100%"
        height="100%"
        bg="transparent"
        color={color}
        padding="2"
        border="none"
        fontSize={`${(size.width.split("p")[0] * 1) / 2.5}px `}
        className="noHoverEffect"
      />

      <VStack
        gridGap="1"
        position="absolute"
        right="-50%"
        bg="red"
        height="200px"
        width="100px"
      >
        <Icon
          as={BiCheck}
          onClick={() => onRemoveActiveInput(mock)}
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
        <ColorPicker color={color} setColor={setColor} />
      </VStack>
    </Rnd>
  );
};

export default TextInput;
