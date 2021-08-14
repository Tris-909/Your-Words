import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import { useOutsideClick } from "@chakra-ui/react";

const ColorPicker = (currentColor) => {
  const [color, setColor] = useState(currentColor);
  const [isChoosingColor, setIsChoosingColor] = useState(false);
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: () => setIsChoosingColor(false),
  });

  const handlerChange = (color, e) => {
    setColor(color.hex);
    console.log("color", color);
  };

  return (
    <Box
      width="100%"
      display="flex"
      flexDirection="column"
      justifyContent="center"
      alignItems="center"
    >
      <Box
        width="32px"
        height="32px"
        bg="white"
        border="2px solid gray"
        borderRadius="5px"
        onClick={() => setIsChoosingColor(true)}
      ></Box>
      <Box
        ref={ref}
        position="absolute"
        right="-160%"
        top="45%"
        display={isChoosingColor ? "initial" : "none"}
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
