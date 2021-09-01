import React, { useState } from "react";
import { Box, Icon } from "@chakra-ui/react";
import { clearViewFullSizeState } from "redux/features/images/images";
import { useLockBodyScroll } from "libs/lockScrollBar";
import { Carousel } from "react-responsive-carousel";
import { BiCaretLeft, BiCaretRight, BiX } from "react-icons/bi";
import CommonImage from "components/Common/Image/Image";
import { useDispatch } from "react-redux";
import "./FullSizeImage.scss";

const FullSizeImage = ({ images }) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const dispatch = useDispatch();
  useLockBodyScroll();

  const onExitFullSizeImageHandler = () => {
    dispatch(clearViewFullSizeState({}));
  };

  return (
    <Box
      width="100%"
      top={0}
      height="100vh"
      position="absolute"
      zIndex="99"
      bg="black"
      display="flex"
      justifyContent="center"
      alignItems="center"
    >
      <Icon
        as={BiX}
        onClick={() => {
          onExitFullSizeImageHandler();
        }}
        color="white"
        width="45px"
        height="45px"
        position="absolute"
        zIndex={1001}
        cursor="pointer"
        left="2%"
        top="3%"
      />
      {currentImageIndex !== 0 && (
        <Icon
          as={BiCaretLeft}
          onClick={() => {
            setCurrentImageIndex(currentImageIndex - 1);
          }}
          color="white"
          width="36px"
          height="36px"
          opacity={0.6}
          position="absolute"
          zIndex={5}
          cursor="pointer"
          left="1%"
          top="50%"
        />
      )}
      <Carousel
        selectedItem={currentImageIndex}
        showStatus={false}
        showThumbs={false}
        showIndicators={false}
        showArrows={false}
        infiniteLoop={false}
        width="60%"
        className="carousel"
      >
        {images.map((singleImage) => {
          return (
            <CommonImage
              source={singleImage.source}
              width="75%"
              height="100%"
              key={singleImage.id}
            />
          );
        })}
      </Carousel>
      {currentImageIndex !== images.length - 1 && (
        <Icon
          as={BiCaretRight}
          onClick={() => {
            setCurrentImageIndex(currentImageIndex + 1);
          }}
          color="white"
          width="36px"
          height="36px"
          opacity={0.6}
          position="absolute"
          zIndex={5}
          right="1%"
          cursor="pointer"
          top="50%"
        />
      )}
    </Box>
  );
};

export default FullSizeImage;
