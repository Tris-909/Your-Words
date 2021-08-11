import React, { useState } from "react";
import { Box, Text } from "@chakra-ui/react";
import TexInput from "./Input";
import { updateHeadingContent } from "redux/features/heading/heading";
import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { updateHeading } from "graphql/mutations";

const Heading = ({ id, content }) => {
  const [input, setInput] = useState(content);
  const [isEditting, setIsEditting] = useState(false);
  const dispatch = useDispatch();

  const ActiveInput = () => {
    setIsEditting(true);
  };

  const onRemoveActiveInput = async (e) => {
    setIsEditting(false);
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
