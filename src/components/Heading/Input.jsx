import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { Input } from "@chakra-ui/react";
import { updateLocalWidthHeight } from "redux/features/heading/heading";
import { useDispatch } from "react-redux";

const TextInput = ({ input, setInput, onRemoveActiveInput, headingId }) => {
  const inputRef = useRef(null);
  const [size, setSize] = useState({
    width: 100,
    height: 100,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

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
