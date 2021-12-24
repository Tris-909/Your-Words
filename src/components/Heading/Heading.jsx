import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import TexInput from "./components/EditInput/Input";
import { getEditHeading } from "redux/features/heading/heading";
import { useDispatch, useSelector } from "react-redux";
import { deleteHeadingLocally } from "redux/features/heading/heading";
import { deleteHeading } from "graphql/mutations";
import { BiPen, BiTrash } from "react-icons/bi";
import { executeGraphqlRequest } from "libs/awsLib";
import IconButton from "components/Buttons/IconButton/IconButton";

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
  const { userInfo } = useSelector((state) => state.user);
  const editIsLocked = userInfo?.data?.lockEdit;

  const activeInput = () => {
    setShowEditHeading(true);
    dispatch(getEditHeading({ headingId: id }));
  };

  const deleteHeadingHandler = async () => {
    await executeGraphqlRequest(deleteHeading, { id });
    dispatch(deleteHeadingLocally({ headingId: id }));
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
          position="absolute"
          top={positionY}
          left={positionX}
          height={`${headingHeight.split("p")[0]}px `}
          width={`${headingWidth.split("p")[0]}px `}
          fontSize={`${headingFontsize}px `}
          transform={`rotate(${headingRotateDegree}deg)`}
          fontFamily={headingFontFamily}
          color={headingColor}
          fontWeight={headingBold ? "bold" : "normal"}
          fontStyle={headingItalic ? "italic" : "initial"}
          textDecoration={
            headingUnderline
              ? "underline"
              : headingStrikethrough
              ? "line-through"
              : "initial"
          }
          display="inline-flex"
          justifyContent="flex-start"
          alignItems="center"
          gridGap="6"
          padding="8px"
          wordBreak="break-word"
          className={editIsLocked ? "" : "hoverEffect"}
        >
          {input}
          {!editIsLocked && (
            <Box display="flex" flexDirection="column" gridGap="4">
              <IconButton as={BiPen} onClick={() => activeInput()} />
              <IconButton as={BiTrash} onClick={() => deleteHeadingHandler()} />
            </Box>
          )}
        </Box>
      )}
    </>
  );
};

export default Heading;
