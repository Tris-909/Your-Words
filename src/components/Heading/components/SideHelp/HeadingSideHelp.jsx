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
  BiCheck,
  BiX,
} from "react-icons/bi";
import ColorPicker from "components/Heading/components/ColorPicker/ColorPicker";
import { useSelector, useDispatch } from "react-redux";
import { useOutsideClick } from "@chakra-ui/react";
import {
  updateHeadingLocally,
  updateEditHeading,
  clearEditHeading,
} from "redux/features/heading/heading";
import { API, graphqlOperation } from "aws-amplify";
import { updateHeading } from "graphql/mutations";
import "./sideHelp.scss";

const HeadingSideHelp = ({ setShowEditHeading }) => {
  const dispatch = useDispatch();
  const { editHeading } = useSelector((state) => state.headings);
  const [color, setColor] = useState(editHeading.color);
  const [rotateDegree, setRotateDegree] = useState(editHeading.rotateDegree);
  const [fontSize, setFontSize] = useState(editHeading.fontSize);
  const [fontFamily, setFontFamily] = useState(editHeading.fontFamily);
  const [showingFontFamilySelect, setShowingFontFamilySelect] = useState(false);
  const [bold, setBold] = useState(editHeading.bold);
  const [italic, setItalic] = useState(editHeading.italic);
  const [underline, setUnderline] = useState(editHeading.underline);
  const [strikeThrough, setStrikeThrough] = useState(editHeading.strikeThrough);

  const fontFamilyPanelRef = useRef();
  useOutsideClick({
    ref: fontFamilyPanelRef,
    handler: () => setShowingFontFamilySelect(false),
  });

  const onCancelEdit = () => {
    setShowEditHeading(false);
    dispatch(clearEditHeading({}));
  };

  const onRemoveActiveInput = async () => {
    setShowEditHeading(false);
    dispatch(
      updateHeadingLocally({
        id: editHeading.id,
        editValue: editHeading.content,
        newColor: color,
        rotateDegree: rotateDegree,
        fontSize: fontSize,
        fontFamily: fontFamily,
        bold: bold,
        italic: italic,
        underline: underline,
        strikeThrough: strikeThrough,
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
          bold: bold,
          italic: italic,
          underline: underline,
          strikeThrough: strikeThrough,
        },
      })
    );

    dispatch(clearEditHeading({}));
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
    <Box className="sidehelp--container">
      <Box className="sidehelp--section">
        <Box className="sidehelp--section--header">Color</Box>
        <ColorPicker color={color} setColor={setColor} />
      </Box>
      <Box className="sidehelp--section">
        <Box className="sidehelp--section--header">Rotation</Box>
        <HStack justifyContent="center" alignItems="center">
          <Icon
            as={BiChevronsLeft}
            onClick={() => updateRotateDegree("-10")}
            className="sidehelp--section--rotationButton"
          />
          <Icon
            as={BiChevronLeft}
            onClick={() => updateRotateDegree("-5")}
            className="sidehelp--section--rotationButton"
          />
          <Icon
            as={BiChevronRight}
            onClick={() => updateRotateDegree("+5")}
            className="sidehelp--section--rotationButton"
          />
          <Icon
            as={BiChevronsRight}
            onClick={() => updateRotateDegree("+10")}
            className="sidehelp--section--rotationButton"
          />
        </HStack>
      </Box>
      <Box className="sidehelp--section">
        <Box className="sidehelp--section--header">Font size</Box>
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
      <Box className="sidehelp--section">
        <Box className="sidehelp--section--header">Font Family</Box>
        <Box
          fontFamily={fontFamily}
          onClick={() => setShowingFontFamilySelect(true)}
          className="sidehelp--section--fontFamilyReview"
        >
          {fontFamily}
        </Box>
        {showingFontFamilySelect && (
          <Box
            ref={fontFamilyPanelRef}
            className="sidehelp--section--fontFamilySelectPanel"
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
      <Box className="sidehelp--section">
        <HStack w="100%" marginTop={2}>
          <Box width="50%">
            <Icon
              as={BiBold}
              bg={bold ? "black" : "#f7faf9"}
              color={bold ? "#f7faf9" : "black"}
              onClick={() => {
                setBold(!bold);
                dispatch(
                  updateEditHeading({
                    bold: !bold,
                    italic,
                    underline,
                    strikeThrough,
                  })
                );
              }}
              className="sidehelp--section--textOptionsButton"
            />
          </Box>
          <Box width="50%">
            <Icon
              as={BiItalic}
              bg={italic ? "black" : "#f7faf9"}
              color={italic ? "#f7faf9" : "black"}
              onClick={() => {
                setItalic(!italic);
                dispatch(
                  updateEditHeading({
                    italic: !italic,
                    bold,
                    underline,
                    strikeThrough,
                  })
                );
              }}
              className="sidehelp--section--textOptionsButton"
            />
          </Box>
        </HStack>
        <HStack w="100%" marginTop={3}>
          <Box width="100%">
            <Icon
              as={BiUnderline}
              bg={underline ? "black" : "#f7faf9"}
              color={underline ? "#f7faf9" : "black"}
              onClick={() => {
                if (!underline) {
                  setUnderline(true);
                  setStrikeThrough(false);
                  dispatch(
                    updateEditHeading({
                      underline: true,
                      strikeThrough: false,
                      bold,
                      italic,
                    })
                  );
                } else {
                  setUnderline(false);
                  dispatch(
                    updateEditHeading({
                      underline: false,
                      strikeThrough: false,
                      bold,
                      italic,
                    })
                  );
                }
              }}
              className="sidehelp--section--textOptionsButton"
            />
          </Box>
          <Box width="100%">
            <Icon
              as={BiStrikethrough}
              bg={strikeThrough ? "black" : "#f7faf9"}
              color={strikeThrough ? "#f7faf9" : "black"}
              onClick={() => {
                if (!strikeThrough) {
                  setUnderline(false);
                  setStrikeThrough(true);
                  dispatch(
                    updateEditHeading({
                      strikeThrough: true,
                      underline: false,
                      bold,
                      italic,
                    })
                  );
                } else {
                  setStrikeThrough(false);
                  dispatch(
                    updateEditHeading({
                      strikeThrough: false,
                      underline: false,
                      bold,
                      italic,
                    })
                  );
                }
              }}
              className="sidehelp--section--textOptionsButton"
            />
          </Box>
        </HStack>
      </Box>
      <Box className="sidehelp--section--saveButton">
        <Box className="center" onClick={() => onCancelEdit()}>
          <Icon as={BiX} width="2rem" height="2rem" />
        </Box>
        <Box
          borderLeft="2px solid gray"
          className="center"
          onClick={() => onRemoveActiveInput()}
        >
          <Icon as={BiCheck} width="2rem" height="2rem" />
        </Box>
      </Box>
    </Box>
  );
};

export default HeadingSideHelp;
