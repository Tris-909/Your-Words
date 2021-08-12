import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { Input } from "@chakra-ui/react";
import { updateLocalWidthHeight } from "redux/features/heading/heading";
import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { updateHeading } from "graphql/mutations";

const TextInput = ({
  input,
  setInput,
  onRemoveActiveInput,
  headingId,
  width,
  height,
}) => {
  const inputRef = useRef(null);
  const [size, setSize] = useState({
    width: width,
    height: height,
  });
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

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
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
    >
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => setInput(e.target.value)}
        onBlur={(e) => onRemoveActiveInput(e)}
        border="2px solid white"
        width="100%"
        height="100%"
        bg="white"
        color="black"
      />
    </Rnd>
  );
};

export default TextInput;
