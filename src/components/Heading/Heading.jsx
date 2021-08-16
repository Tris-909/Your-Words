import React, { useState } from "react";
import { Box, Icon } from "@chakra-ui/react";
import TexInput from "./Input";
import { getEditHeading } from "redux/features/heading/heading";
import { useDispatch, useSelector } from "react-redux";
import { BiPen } from "react-icons/bi";
import "./Heading.scss";

const Heading = ({
  id,
  content,
  positionX,
  positionY,
  headingWidth,
  headingHeight,
  headingColor,
  headingFontsize,
  headingRotateDegree,
  headingFontFamily,
  showEditHeading,
  headingBold,
  headingItalic,
  headingUnderline,
  headingStrikethrough,
  setShowEditHeading,
}) => {
  const dispatch = useDispatch();
  const [input, setInput] = useState(content);
  const { editHeading } = useSelector((state) => state.headings);

  const ActiveInput = () => {
    setShowEditHeading(true);
    dispatch(getEditHeading({ headingId: id }));
  };

  return (
    <>
      {showEditHeading ? (
        <TexInput
          input={input}
          setInput={setInput}
          headingId={id}
          width={headingWidth}
          height={headingHeight}
          positionx={positionX}
          positiony={positionY}
          headingColor={editHeading.color}
          headingFontsize={editHeading.fontSize}
          headingRotateDegree={editHeading.rotateDegree}
          headingFontFamily={editHeading.fontFamily}
          headingBold={editHeading.bold}
          headingItalic={editHeading.italic}
          headingUnderline={editHeading.underline}
          headingStrikethrough={editHeading.strikeThrough}
          showEditHeading={showEditHeading}
        />
      ) : (
        <Box
          height={`${headingHeight.split("p")[0] * 1 + 40}px `}
          width={`${headingWidth.split("p")[0] * 1 + 55}px `}
          fontSize={`${headingFontsize}px `}
          transform={`translate(${positionX}px, ${positionY}px) rotate(${headingRotateDegree}deg)`}
          fontFamily={headingFontFamily}
          color={headingColor}
          cursor="move"
          display="flex"
          justifyContent="flex-start"
          alignItems="flex-start"
          fontWeight={headingBold ? "bold" : "normal"}
          fontStyle={headingItalic ? "italic" : "initial"}
          textDecoration={
            headingUnderline
              ? "underline"
              : headingStrikethrough
              ? "line-through"
              : "initial"
          }
          className="hoverEffect"
        >
          {input}
          <Icon
            as={BiPen}
            onClick={() => ActiveInput()}
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
        </Box>
      )}
    </>
  );
};

export default Heading;
