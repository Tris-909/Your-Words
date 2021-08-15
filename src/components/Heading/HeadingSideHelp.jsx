import React, { useState, useRef } from "react";
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
  BiBold,
  BiItalic,
  BiUnderline,
  BiStrikethrough,
} from "react-icons/bi";
import ColorPicker from "components/Heading/ColorPicker";
import { useSelector, useDispatch } from "react-redux";
import { useLockBodyScroll } from "libs/lockScrollBar";
import { useOutsideClick } from "@chakra-ui/react";
import {
  updateHeadingContent,
  updateHeadingColor,
  updateHeadingFontsize,
  updateHeadingRotationDegree,
  updateHeadingFontFamily,
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
  const [rotateDegree, setRotateDegree] = useState(editHeading.rotateDegree);
  const [fontSize, setFontSize] = useState(editHeading.fontSize);
  const [fontFamily, setFontFamily] = useState(editHeading.fontFamily);
  const [showingFontFamilySelect, setShowingFontFamilySelect] = useState(false);

  const fontFamilyPanelRef = useRef();
  useOutsideClick({
    ref: fontFamilyPanelRef,
    handler: () => setShowingFontFamilySelect(false),
  });

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
    dispatch(
      updateHeadingRotationDegree({
        id: editHeading.id,
        rotateDegree: rotateDegree,
      })
    );
    dispatch(
      updateHeadingFontFamily({
        id: editHeading.id,
        fontFamily: fontFamily,
      })
    );

    await API.graphql(
      graphqlOperation(updateHeading, {
        input: {
          id: editHeading.id,
          content: editHeading.content,
          color: color,
          fontSize: fontSize,
          rotateDegree: rotateDegree,
          fontFamily: fontFamily,
        },
      })
    );
  };

  const updateRotateDegree = (option) => {
    if (option === "+10") {
      setRotateDegree(rotateDegree + 10);
      dispatch(updateEditHeading({ rotateDegree: rotateDegree + 10 }));
    } else if (option === "+5") {
      setRotateDegree(rotateDegree + 5);
      dispatch(updateEditHeading({ rotateDegree: rotateDegree + 5 }));
    } else if (option === "-10") {
      setRotateDegree(rotateDegree - 10);
      dispatch(updateEditHeading({ rotateDegree: rotateDegree - 10 }));
    } else if (option === "-5") {
      setRotateDegree(rotateDegree - 5);
      dispatch(updateEditHeading({ rotateDegree: rotateDegree - 5 }));
    }
  };

  const updatingFontFamily = (newFont) => {
    setFontFamily(newFont);
    dispatch(updateEditHeading({ fontFamily: newFont }));
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
            onClick={() => updateRotateDegree("-10")}
          />
          <Icon
            as={BiChevronLeft}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
            onClick={() => updateRotateDegree("-5")}
          />
          <Icon
            as={BiChevronRight}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
            onClick={() => updateRotateDegree("+5")}
          />
          <Icon
            as={BiChevronsRight}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
            onClick={() => updateRotateDegree("+10")}
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
        textAlign="center"
        position="relative"
        height="fit-content"
        paddingTop="2"
        paddingBottom="4"
        borderBottom="1px solid gray"
      >
        <Box fontSize="18px" fontWeight="bold" marginBottom="2">
          Font Family
        </Box>
        <Box
          color="black"
          border="2px solid black"
          margin="5%"
          padding="5px 0px"
          cursor="pointer"
          fontFamily={fontFamily}
          onClick={() => setShowingFontFamilySelect(true)}
        >
          {fontFamily}
        </Box>
        {showingFontFamilySelect && (
          <Box
            ref={fontFamilyPanelRef}
            position="absolute"
            left="-83%"
            top="20%"
            zIndex="10"
            bg="white"
            border="2px solid black"
            borderRadius="5px"
            padding={2}
          >
            <Box
              fontFamily="Roboto"
              bg={fontFamily === "Roboto" ? "black" : "white"}
              color={fontFamily === "Roboto" ? "white" : "black"}
              cursor="pointer"
              onClick={() => updatingFontFamily("Roboto")}
            >
              {" "}
              Roboto{" "}
            </Box>
            <Box
              fontFamily="Allan"
              cursor="pointer"
              bg={fontFamily === "Allan" ? "black" : "white"}
              color={fontFamily === "Allan" ? "white" : "black"}
              onClick={() => updatingFontFamily("Allan")}
            >
              {" "}
              Allan{" "}
            </Box>
            <Box
              fontFamily="Shadows Into Light"
              cursor="pointer"
              bg={fontFamily === "Shadows Into Light" ? "black" : "white"}
              color={fontFamily === "Shadows Into Light" ? "white" : "black"}
              onClick={() => updatingFontFamily("Shadows Into Light")}
            >
              {" "}
              Shadows Into Light{" "}
            </Box>
            <Box
              fontFamily="Caveat"
              cursor="pointer"
              bg={fontFamily === "Caveat" ? "black" : "white"}
              color={fontFamily === "Caveat" ? "white" : "black"}
              onClick={() => updatingFontFamily("Caveat")}
            >
              {" "}
              Caveat{" "}
            </Box>
            <Box
              fontFamily="Courgette"
              cursor="pointer"
              bg={fontFamily === "Courgette" ? "black" : "white"}
              color={fontFamily === "Courgette" ? "white" : "black"}
              onClick={() => updatingFontFamily("Courgette")}
            >
              {" "}
              Courgette{" "}
            </Box>
            <Box
              fontFamily="mono"
              cursor="pointer"
              bg={fontFamily === "mono" ? "black" : "white"}
              color={fontFamily === "mono" ? "white" : "black"}
              onClick={() => updatingFontFamily("mono")}
            >
              {" "}
              Mono{" "}
            </Box>
          </Box>
        )}
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
        <HStack w="100%" marginTop={2}>
          <Box width="50%">
            <Icon
              as={BiBold}
              width="26px"
              height="26px"
              bg="#f7faf9"
              // color="white"
              // bg="black"
              border="1px"
              borderRadius="4px"
              cursor="pointer"
            />
          </Box>
          <Box width="50%">
            <Icon
              as={BiItalic}
              width="26px"
              height="26px"
              bg="#f7faf9"
              border="1px"
              borderRadius="4px"
              cursor="pointer"
            />
          </Box>
        </HStack>
        <HStack w="100%" marginTop={3}>
          <Box width="100%">
            <Icon
              as={BiUnderline}
              width="26px"
              height="26px"
              bg="#f7faf9"
              border="1px"
              borderRadius="4px"
              cursor="pointer"
            />
          </Box>
          <Box width="100%">
            <Icon
              as={BiStrikethrough}
              width="26px"
              height="26px"
              bg="#f7faf9"
              border="1px"
              borderRadius="4px"
              cursor="pointer"
            />
          </Box>
        </HStack>
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
