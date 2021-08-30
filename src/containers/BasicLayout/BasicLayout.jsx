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
import { useSelector } from "react-redux";
import NavBar from "components/NavBar/NavBar";
import { LinkWrapper } from "components/LinkWrapper/LinkWrapper";
import FullSizeImage from "components/Images/components/FullSize/FullSizeImage";
import "./BasicLayout.scss";

const BasicLayout = (props) => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { userInfo } = useSelector((state) => state.user);
  const { fullSizeImage } = useSelector((state) => state.images);

  return (
    <Box position="relative">
      <Box
        className="Home"
        height={userInfo.data ? `${userInfo.data.boardHeight}px` : `100vh`}
        display="flex"
        flexDirection="column"
      >
        <NavBar onOpen={onOpen} />
        <Box flexGrow="1" position="relative" width="99%">
          {props.children}
        </Box>
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
      {fullSizeImage.data.length > 0 && (
        <FullSizeImage images={fullSizeImage.data} />
      )}
    </Box>
  );
};

export default BasicLayout;
