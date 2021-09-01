import React, { useState } from "react";
import { Carousel } from "react-responsive-carousel";
import { Rnd } from "react-rnd";
import { Icon, Box } from "@chakra-ui/react";
import {
  BiCaretLeft,
  BiCaretRight,
  BiTrash,
  BiSearchAlt,
} from "react-icons/bi";
import { updateImages, deleteImages } from "graphql/mutations";
import {
  updateImagesLocally,
  deleteImagesLocally,
  loadViewFullSize,
} from "redux/features/images/images";
import { useDispatch } from "react-redux";
import IconButton from "components/Buttons/IconButton/IconButton";
import { deleteFromS3, executeGraphqlRequest } from "libs/awsLib";
import EditImagesModal from "components/Images/components/Modal/editImageModal";
import { useDisclosure } from "@chakra-ui/react";
import "react-responsive-carousel/lib/styles/carousel.min.css";
import CommonImage from "components/Common/Image/Image";
import "./Images.scss";

const ImageContainer = ({ src }) => {
  return (
    <CommonImage source={src} width="400px" height="400px" borderRadius="0px" />
  );
};

const Images = ({ image }) => {
  const dispatch = useDispatch();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [position, setPosition] = useState({
    x: image.x,
    y: image.y,
  });

  const deleteImagesHandler = async () => {
    await executeGraphqlRequest(deleteImages, {
      id: image.id,
    });

    for (let i = 0; i < image.list.length; i++) {
      await deleteFromS3(image.list[i].source);
    }

    dispatch(deleteImagesLocally({ id: image.id }));
  };

  return (
    <Rnd
      position={{ x: position.x, y: position.y }}
      bounds="parent"
      onDragStop={async (e, d) => {
        setPosition({
          x: d.x,
          y: d.y,
        });

        await executeGraphqlRequest(updateImages, {
          id: image.id,
          x: d.x,
          y: d.y,
        });

        dispatch(updateImagesLocally({ id: image.id, newY: d.y, newX: d.x }));
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
        className="gallery-carousel hoverEffect"
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
          {image.list.map((singleImage) => {
            return (
              <ImageContainer src={singleImage.source} key={singleImage.id} />
            );
          })}
        </Carousel>

        <Icon
          as={BiSearchAlt}
          onClick={() => {
            dispatch(loadViewFullSize({ newImageList: image.list }));
          }}
          className="zoom--hoverEffect"
          color="white"
          width="36px"
          height="36px"
          opacity={0}
          position="absolute"
          zIndex={5}
          cursor="pointer"
          left="47%"
          top="45%"
        />

        {currentImageIndex !== image.list.length - 1 && (
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
        <Box
          display="flex"
          flexDirection="column"
          alignItems="flex-end"
          width="115%"
          gridGap={4}
          position="absolute"
          top="0%"
          right="-15%"
          zIndex="-1"
          cursor="initial"
          className="hoverEffect"
        >
          <EditImagesModal
            isOpen={isOpen}
            onOpen={onOpen}
            onClose={onClose}
            image={image}
          />
          <IconButton as={BiTrash} onClick={() => deleteImagesHandler()} />
        </Box>
      </Box>
    </Rnd>
  );
};

export default Images;
