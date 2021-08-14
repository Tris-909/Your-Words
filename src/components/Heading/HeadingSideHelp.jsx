import React from "react";
import { Box, Icon, HStack } from "@chakra-ui/react";
import {
  BiChevronsLeft,
  BiChevronsRight,
  BiChevronLeft,
  BiChevronRight,
} from "react-icons/bi";
import ColorPicker from "components/Heading/ColorPicker";

const HeadingSideHelp = () => {
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
        <ColorPicker />
      </Box>
      <Box
        w="100%"
        textAlign="center"
        position="relative"
        height="fit-content"
        paddingTop="2"
        paddingBottom="4"
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
          />
          <Icon
            as={BiChevronLeft}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
          />
          <Icon
            as={BiChevronRight}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
          />
          <Icon
            as={BiChevronsRight}
            bg="#f0f0f0"
            width="25px"
            height="25px"
            border="1px solid black"
            borderRadius="4px"
            cursor="pointer"
          />
        </HStack>
      </Box>
      <Box
        w="100%"
        position="relative"
        height="fit-content"
        paddingBottom="4"
        bg="black"
        color="white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        fontSize="20px"
        cursor="pointer"
      >
        Save
      </Box>
    </Box>
  );
};

export default HeadingSideHelp;
