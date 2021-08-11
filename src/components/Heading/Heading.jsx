import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import TexInput from "./Input";

const Heading = ({ content }) => {
  const [input, setInput] = useState(content);
  const [isEditting, setIsEditting] = useState(false);

  const ActiveInput = () => {
    setIsEditting(true);
  };

  const onRemoveActiveInput = (e) => {
    setIsEditting(false);
    setInput(e.target.value);
  };

  return (
    <Box width="fit-content" color="white">
      {isEditting ? (
        <TexInput
          input={input}
          setInput={setInput}
          onRemoveActiveInput={onRemoveActiveInput}
        />
      ) : (
        <Text
          onClick={() => ActiveInput()}
          height="40px"
          display="flex"
          justifyContent="flex-start"
          px={"16px"}
          alignItems="center"
        >
          {input}
        </Text>
      )}
    </Box>
  );
};

export default Heading;
