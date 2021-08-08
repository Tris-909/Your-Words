import React, { useState } from "react";
import { SliderPicker } from "react-color";
import { Box, Input, HStack, Button } from "@chakra-ui/react";
import Label from "components/Note/components/Label";
import { API, graphqlOperation } from "aws-amplify";
import { updateTodo } from "graphql/mutations";
import { addingNewLabel, removeALabel } from "redux/features/notes/note";
import { useDispatch } from "react-redux";
import * as uuid from "uuid";

const LabelInput = ({ note }) => {
  const [bg, setBg] = useState("#fff");
  const [labelValue, setLabelValue] = useState("");
  const dispatch = useDispatch();

  const createLabel = async () => {
    const label = {
      id: uuid.v1(),
      content: labelValue,
      color: bg,
    };

    await API.graphql(
      graphqlOperation(updateTodo, {
        input: {
          id: note.id,
          labels: [...note.labels, label],
        },
      })
    );

    dispatch(addingNewLabel({ id: note.id, newLable: label }));
    setLabelValue("");
  };

  const removeLabel = async (labelId) => {
    await dispatch(removeALabel({ noteId: note.id, labelId: labelId }));
    await RemoveLabelInDatabases(labelId);
  };

  const RemoveLabelInDatabases = async (labelId) => {
    let currentLabelList = [...note.labels];

    const deletePosition = currentLabelList.findIndex(
      (item) => item.id === labelId
    );
    currentLabelList.splice(deletePosition, 1);

    await API.graphql(
      graphqlOperation(updateTodo, {
        input: {
          id: note.id,
          labels: currentLabelList,
        },
      })
    );
  };

  return (
    <>
      <Box fontSize="16px" fontWeight="500" my={3}>
        Label
      </Box>
      <SliderPicker color={bg} onChangeComplete={(color) => setBg(color.hex)} />
      <Box
        display="flex"
        flexWrap="wrap"
        width="450px"
        mx="1"
        marginTop="1.5rem"
        marginBottom="0.5rem"
        gridColumnGap="8px"
        gridRowGap="0.5rem"
      >
        {note.labels.length > 0 &&
          note.labels.map((item) => {
            return (
              <Label
                key={item.id}
                id={item.id}
                noteId={note.id}
                content={item.content}
                bgColor={item.color}
                closable
                deleteAction={() => removeLabel(item.id)}
              />
            );
          })}
      </Box>
      <Label
        content={labelValue}
        bgColor={bg}
        minWidth="100px"
        maxWidth="initial"
        height="19.2px"
        marginBottom={2}
        closable={false}
      />
      <HStack>
        <Input
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
        />
        <Button color="white" bg="black" p={4} onClick={createLabel}>
          {" "}
          Add Label{" "}
        </Button>
      </HStack>
    </>
  );
};

export default LabelInput;
