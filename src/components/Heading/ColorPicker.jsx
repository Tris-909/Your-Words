import React, { useState } from "react";
import { Box } from "@chakra-ui/react";
import { ChromePicker } from "react-color";
import { useOutsideClick } from "@chakra-ui/react";

const ColorPicker = ({ color, setColor }) => {
  const [isChoosingColor, setIsChoosingColor] = useState(false);
  const ref = React.useRef();
  useOutsideClick({
    ref: ref,
    handler: () => setIsChoosingColor(false),
  });

  const handlerChange = (color, e) => {
    setColor(color.hex);
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
        bg={color}
        border="2px solid gray"
        borderRadius="5px"
        onClick={() => setIsChoosingColor(true)}
      ></Box>
      <Box
        ref={ref}
        position="absolute"
        left="-125%"
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
