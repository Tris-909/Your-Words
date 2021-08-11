import React, { useEffect, useRef } from "react";
import { Input } from "@chakra-ui/react";

const TextInput = ({ input, setInput, onRemoveActiveInput }) => {
  const inputRef = useRef(null);

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  return (
    <Input
      ref={inputRef}
      value={input}
      onChange={(e) => setInput(e.target.value)}
      onBlur={(e) => onRemoveActiveInput(e)}
      border="2px solid white"
      bg="white"
      color="black"
    />
  );
};

export default TextInput;
