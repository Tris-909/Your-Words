import React, { useState, useEffect, useRef } from "react";
import { Rnd } from "react-rnd";
import { Input } from "@chakra-ui/react";
import {
  updateHeadingLocally,
  updateEditHeading,
} from "redux/features/heading/heading";
import { useDispatch } from "react-redux";
import { API, graphqlOperation } from "aws-amplify";
import { updateHeading } from "graphql/mutations";
import "./Heading.scss";

export const EditHeadingContext = React.createContext();

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
    await API.graphql(
      graphqlOperation(updateHeading, {
        input: {
          id: headingId,
          width: newWidth,
          height: newHeight,
        },
      })
    );
  };

  const changeValue = (e) => {
    setInput(e.target.value);
    dispatch(updateEditHeading({ content: e.target.value }));
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

        await API.graphql(
          graphqlOperation(updateHeading, {
            input: {
              id: headingId,
              x: d.x,
              y: d.y,
            },
          })
        );

        dispatch(updateHeadingLocally({ id: headingId, newY: d.y, newX: d.x }));
        // dispatch(
        //   updateLocalXYPosition({ id: headingId, newY: d.y, newX: d.x })
        // );
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
        position: "relative",
        borderRadius: "5px",
      }}
    >
      <Input
        ref={inputRef}
        value={input}
        onChange={(e) => changeValue(e)}
        width="100%"
        height="100%"
        bg="transparent"
        color={headingColor}
        padding="2"
        border="none"
        fontSize={`${headingFontsize}px`}
        transform={`rotate(${headingRotateDegree}deg)`}
        fontFamily={headingFontFamily}
        className="noHoverEffect"
        fontWeight={headingBold ? "bold" : "normal"}
        fontStyle={headingItalic ? "italic" : "initial"}
        textDecoration={
          headingUnderline
            ? "underline"
            : headingStrikethrough
            ? "line-through"
            : "initial"
        }
      />
    </Rnd>
  );
};

export default TextInput;
