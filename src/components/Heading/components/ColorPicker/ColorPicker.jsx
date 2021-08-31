import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import { useOutsideClick } from "@chakra-ui/react";
import { updateEditHeading } from "redux/features/heading/heading";
import { useDispatch } from "react-redux";
import "./colorPicker.scss";

const ColorPicker = ({
  color,
  setColor,
  bold,
  italic,
  underline,
  strikeThrough,
}) => {
  const [isChoosingColor, setIsChoosingColor] = useState(false);
  const dispatch = useDispatch();
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: () => setIsChoosingColor(false),
  });

  const handlerChange = (color, e) => {
    setColor(color.hex);
    dispatch(
      updateEditHeading({
        color: color.hex,
        bold: bold,
        italic: italic,
        underline: underline,
        strikeThrough: strikeThrough,
      })
    );
  };

  return (
    <Box className="colorpicker--container">
      <Box
        bg={color}
        onClick={() => setIsChoosingColor(true)}
        className="colorpicker--review"
      ></Box>
      <Box
        ref={ref}
        display={isChoosingColor ? "initial" : "none"}
        className="colorpicker--select"
      >
        <ChromePicker
          disableAlpha={false}
          color={color}
          onChange={handlerChange}
        />
      </Box>
    </Box>
  );
};

export default ColorPicker;
