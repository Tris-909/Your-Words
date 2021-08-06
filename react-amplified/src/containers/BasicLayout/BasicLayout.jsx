import React from "react";
import {
  Box,
  VStack,
  Text,
  Divider,
  Drawer,
  DrawerOverlay,
  DrawerContent,
} from "@chakra-ui/react";
import { useDisclosure } from "@chakra-ui/react";
import NavBar from "components/NavBar/NavBar";
import { LinkWrapper } from "components/LinkWrapper/LinkWrapper";
import "./BasicLayout.scss";

const BasicLayout = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Box className="Home" display="flex" flexDirection="column">
      <NavBar onOpen={onOpen} />
      <Box flexGrow="1">{props.children}</Box>
      <Drawer isOpen={isOpen} placement="left" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <VStack>
            <Text py={2} className="logo" textAlign="center">
              <LinkWrapper to="/">Your Words</LinkWrapper>
            </Text>
            <Divider />
          </VStack>
        </DrawerContent>
      </Drawer>
    </Box>
  );
};

export default BasicLayout;
