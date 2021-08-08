import React, { useState } from "react";
import { SliderPicker } from "react-color";
import { Box, Input, HStack, Button } from "@chakra-ui/react";
import Label from "components/Note/components/Label";

const LabelInput = () => {
  const [bg, setBg] = useState("#fff");
  const [labelValue, setLabelValue] = useState("");

  return (
    <>
      <Box fontSize="16px" fontWeight="500" my={3}>
        Label
      </Box>
      <SliderPicker color={bg} onChangeComplete={(color) => setBg(color.hex)} />
      <Box
        display="flex"
        flexWrap="wrap"
        width="450px"
        mx="1"
        marginTop="1.5rem"
        marginBottom="0.5rem"
        gridColumnGap="8px"
        gridRowGap="0.5rem"
      >
        <Label content="Development" bgColor="#2bcfbe" closable />
        <Label content="Feature" bgColor="#c4ed2d" closable />
        <Label content="Toy" bgColor="#d60946" closable />
        <Label content="Learning Web AAAAAAAAA" bgColor="#0943d6" closable />
        <Label content="Skill" bgColor="#b709d6" closable />
      </Box>
      <Label
        content={labelValue}
        bgColor={bg}
        minWidth="100px"
        maxWidth="initial"
        height="19.2px"
        marginBottom={2}
        closable={false}
      />
      <HStack>
        <Input
          value={labelValue}
          onChange={(e) => setLabelValue(e.target.value)}
        />
        <Button color="white" bg="black" p={4}>
          {" "}
          Add Label{" "}
        </Button>
      </HStack>
    </>
  );
};

export default LabelInput;
