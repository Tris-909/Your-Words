import React, { useState } from "react";
import {
  Box,
  Icon,
  HStack,
  NumberInput,
  NumberInputField,
  NumberInputStepper,
  NumberIncrementStepper,
  NumberDecrementStepper,
} from "@chakra-ui/react";
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import ColorPicker from "components/Heading/ColorPicker";
import { useSelector, useDispatch } from "react-redux";
import { useLockBodyScroll } from "libs/lockScrollBar";
import {
  updateHeadingContent,
  updateHeadingColor,
  updateHeadingFontsize,
  updateEditHeading,
} from "redux/features/heading/heading";
import { API, graphqlOperation } from "aws-amplify";
import { updateHeading } from "graphql/mutations";

const HeadingSideHelp = ({ setShowEditHeading }) => {
  // While using HeadingEditSideHelp, scrollbar will be locked to avoid weird behaviour
  useLockBodyScroll();

  const dispatch = useDispatch();
  const { editHeading } = useSelector((state) => state.headings);
  const [color, setColor] = useState(editHeading.color);
  const [fontSize, setFontSize] = useState(editHeading.fontSize);

  const onRemoveActiveInput = async () => {
    setShowEditHeading(false);
    dispatch(
      updateHeadingContent({
        id: editHeading.id,
        editValue: editHeading.content,
      })
    );
    dispatch(updateHeadingColor({ id: editHeading.id, newColor: color }));
    dispatch(updateHeadingFontsize({ id: editHeading.id, fontSize: fontSize }));

    await API.graphql(
      graphqlOperation(updateHeading, {
        input: {
          id: editHeading.id,
          content: editHeading.content,
          color: color,
          fontSize: fontSize,
        },
      })
    );
  };

  return (
    <Box
      width="150px"
      bg="#f0f0f0"
      borderRadius="5px"
      borderTopRightRadius="0px"
      borderBottomRightRadius="0px"
      position="fixed"
      right="0"
      top="15%"
      display="flex"
      justifyContent="flex-start"
      flexDirection="column"
    >
      <Box
        w="100%"
        textAlign="center"
        position="relative"
        height="fit-content"
        paddingTop="2"
        paddingBottom="4"
        borderBottom="1px solid gray"
      >
        <Box fontSize="18px" fontWeight="bold" marginBottom="2">
          Color
        </Box>
        <ColorPicker color={color} setColor={setColor} />
      </Box>
      <Box
        w="100%"
        textAlign="center"
        position="relative"
        height="fit-content"
        paddingTop="2"
        paddingBottom="4"
        borderBottom="1px solid gray"
      >
        <Box fontSize="18px" fontWeight="bold" marginBottom="2">
          Rotation
        </Box>
        <HStack justifyContent="center" alignItems="center">
          <Icon
            as={BiChevronsLeft}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
          />
          <Icon
            as={BiChevronLeft}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
          />
          <Icon
            as={BiChevronRight}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
          />
          <Icon
            as={BiChevronsRight}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
          />
        </HStack>
      </Box>
      <Box
        w="100%"
        textAlign="center"
        position="relative"
        height="fit-content"
        paddingTop="2"
        borderBottom="1px solid gray"
      >
        <Box fontSize="18px" fontWeight="bold" marginBottom="2">
          Font size
        </Box>
        <NumberInput
          defaultValue={fontSize}
          onChange={(valueAsString, valueAsNumber) => {
            setFontSize(valueAsNumber);
            dispatch(updateEditHeading({ fontSize: valueAsNumber }));
          }}
          border="1px"
        >
          <NumberInputField borderRadius="0px" />
          <NumberInputStepper border="1px">
            <NumberIncrementStepper borderBottom="1px" />
            <NumberDecrementStepper />
          </NumberInputStepper>
        </NumberInput>
      </Box>
      <Box
        w="100%"
        position="relative"
        height="fit-content"
        padding="3"
        bg="black"
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="20px"
        cursor="pointer"
        onClick={() => onRemoveActiveInput()}
      >
        Save
      </Box>
    </Box>
  );
};

export default HeadingSideHelp;
