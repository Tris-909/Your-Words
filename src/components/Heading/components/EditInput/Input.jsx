import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { Input } from "@chakra-ui/react";
import {
  updateHeadingLocally,
  updateEditHeading,
} from "redux/features/heading/heading";
import { useDispatch } from "react-redux";
import { executeGraphqlRequest } from "libs/awsLib";
import { updateHeading } from "graphql/mutations";

const TextInput = ({
  input,
  setInput,
  headingId,
  width,
  height,
  positionx,
  positiony,
  headingColor,
  headingFontsize,
  headingRotateDegree,
  headingFontFamily,
  headingBold,
  headingItalic,
  headingUnderline,
  headingStrikethrough,
}) => {
  const inputRef = useRef(null);
  const [size, setSize] = useState({
    width: width,
    height: height,
  });
  const [position, setPosition] = useState({
    x: positionx,
    y: positiony,
  });
  const dispatch = useDispatch();

  useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus();
    }
  }, [inputRef.current]);

  const updateWidthAndHeightDynamoDB = async (newWidth, newHeight) => {
    const input = {
      id: headingId,
      width: newWidth,
      height: newHeight,
    };

    await executeGraphqlRequest(updateHeading, input);
  };

  const changeValue = (e) => {
    setInput(e.target.value);
    dispatch(
      updateEditHeading({
        content: e.target.value,
        bold: headingBold,
        italic: headingItalic,
        underline: headingUnderline,
        strikeThrough: headingStrikethrough,
      })
    );
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      bounds="parent"
      onDragStop={async (e, d) => {
        setPosition({
          x: d.x,
          y: d.y,
        });

        const input = {
          id: headingId,
          x: d.x,
          y: d.y,
        };

        await executeGraphqlRequest(updateHeading, input);

        dispatch(updateHeadingLocally({ id: headingId, newY: d.y, newX: d.x }));
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        });

        dispatch(
          updateHeadingLocally({
            id: headingId,
            newWidth: ref.style.width,
            newHeight: ref.style.height,
          })
        );

        updateWidthAndHeightDynamoDB(ref.style.width, ref.style.height);
      }}
      style={{
        display: "flex",
        border: "2px solid white",
        borderRadius: "5px",
      }}
    >
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => changeValue(e)}
        color={headingColor}
        fontSize={`${headingFontsize}px`}
        transform={`rotate(${headingRotateDegree}deg)`}
        fontFamily={headingFontFamily}
        fontWeight={headingBold ? "bold" : "normal"}
        fontStyle={headingItalic ? "italic" : "initial"}
        textDecoration={
          headingUnderline
            ? "underline"
            : headingStrikethrough
            ? "line-through"
            : "initial"
        }
        display="inline-block"
        wordBreak="break-word"
        width={width}
        height={height}
        background="transparent"
        padding="8px"
        border="none"
      />
    </Rnd>
  );
};

export default TextInput;
