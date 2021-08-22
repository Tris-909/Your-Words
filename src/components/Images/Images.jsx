import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Rnd } from "react-rnd";
import { Icon, Box, Image } from "@chakra-ui/react";
import { BiCaretLeft, BiCaretRight } from "react-icons/bi";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import "./Images.scss";

const ImageContainer = ({ src }) => {
  return <Image src={src} width="400px" height="400px" borderRadius="0px" />;
};

const Images = () => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  return (
    <Rnd
      position={{ x: position.x, y: position.y }}
      bounds="parent"
      onDragStop={async (e, d) => {
        setPosition({
          x: d.x,
          y: d.y,
        });

        //   await API.graphql(
        //     graphqlOperation(updateHeading, {
        //       input: {
        //         id: headingId,
        //         x: d.x,
        //         y: d.y,
        //       },
        //     })
        //   );

        //   dispatch(updateHeadingLocally({ id: headingId, newY: d.y, newX: d.x }));
      }}
    >
      <Box
        position="relative"
        width="410px"
        height="410px"
        borderRadius="2px"
        bg="white"
        border="1px solid white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className="gallery-carousel"
      >
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
          width="400px"
        >
          <ImageContainer src="https://helpx.adobe.com/content/dam/help/en/photoshop/using/convert-color-image-black-white/jcr_content/main-pars/before_and_after/image-before/Landscape-Color.jpg" />
          <ImageContainer src="https://www.maxpixel.net/static/photo/1x/Universe-Abstract-Galaxy-Gradient-Space-Background-5629007.jpg" />
          <ImageContainer src="https://static.scientificamerican.com/sciam/cache/file/8B819851-2DAD-4B3D-AF5270EACE5A5361_source.jpg?w=590&h=800&4F27CC97-4819-4142-B97585EF39DC1761" />
          <ImageContainer src="https://www.universetoday.com/wp-content/uploads/2018/08/cropped-delta_iv_heavy_streak_composite_edits.jpg" />
          <ImageContainer src="https://www.travelmanagers.com.au/wp-content/uploads/2012/08/AdobeStock_254529936_Railroad-to-Denali-National-Park-Alaska_750x500.jpg" />
        </Carousel>
        {currentImageIndex !== 4 && (
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
    </Rnd>
  );
};

export default Images;
