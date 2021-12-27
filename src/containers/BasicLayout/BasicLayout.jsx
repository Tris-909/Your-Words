import React from "react";
import { Box } from "@chakra-ui/react";
import { useSelector } from "react-redux";
import NavBar from "components/NavBar/NavBar";
import FullSizeImage from "components/Images/components/FullSize/FullSizeImage";
import "./BasicLayout.scss";

const BasicLayout = (props) => {
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
        <NavBar />
        <Box
          flexGrow="1"
          position="relative"
          width="99%"
          className="movableParent"
        >
          {props.children}
        </Box>
      </Box>
      {fullSizeImage.data.length > 0 && (
        <FullSizeImage images={fullSizeImage.data} />
      )}
    </Box>
  );
};

export default BasicLayout;
