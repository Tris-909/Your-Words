import React, { useState, useRef } from "react";
import Moveable from "react-moveable";
import { Icon, Box, useOutsideClick } from "@chakra-ui/react";
import {
  BiCaretLeft,
  BiCaretRight,
  BiTrash,
  BiSearchAlt,
} from "react-icons/bi";
import { Carousel } from "react-responsive-carousel";
import CommonImage from "components/Common/Image/Image";
import { useDispatch } from "react-redux";
import {
  updateImagesLocally,
  deleteImagesLocally,
  loadViewFullSize,
} from "redux/features/images/images";
import useWindowDimensions from "libs/useWindowDimensions";
import EditImagesModal from "components/Images/components/Modal/editImageModal";
import IconButton from "components/Buttons/IconButton/IconButton";
import { useDisclosure } from "@chakra-ui/react";
import { deleteFromS3, executeGraphqlRequest } from "libs/awsLib";
import { deleteImages } from "graphql/mutations";

const ImageContainer = ({ src }) => {
  return (
    <CommonImage source={src} width="400px" height="400px" borderRadius="0px" />
  );
};

const ImageMovable = ({ image, movable, setMovable }) => {
  // change compared to data saved in databases. Should calculate the new x & y save them to databases, also use that as init value
  const [diffTop, setDiffTop] = useState(0);
  const [diffLeft, setDiffLeft] = useState(0);
  const [newRotation, setNewRotation] = useState(0); // Float. Will need to init here used data from databases

  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [position, setPosition] = useState({
    x: image.x,
    y: image.y,
  });
  const { width } = useWindowDimensions();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const ref = useRef();
  const dispatch = useDispatch();

  useOutsideClick({
    ref: ref,
    handler: () => {},
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
    <>
      <Box
        ref={ref}
        position="absolute"
        width="410px"
        height="410px"
        borderRadius="2px"
        bg="white"
        border="1px solid white"
        display="flex"
        justifyContent="center"
        alignItems="center"
        className={`${image.id} gallery-carousel hoverEffect`}
        onClick={() => {
          setMovable(image.id);
        }}
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
              console.log("clicked");
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
          right={position.x <= width / 2 ? "-15%" : "0%"}
          zIndex="-1"
          cursor="initial"
          className="hoverEffect"
          transform={
            position.x <= width / 2 ? "none" : "rotateZ(180deg) rotateX(180deg)"
          }
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
      {movable === image.id && (
        <Moveable
          target={document.querySelector(`.${image.id}`)}
          container={document.querySelector(".movableParent")}
          origin={true}
          snappable={true}
          bounds={{ left: 0, top: 0, right: 1500, bottom: 1900 }}
          draggable={true}
          throttleDrag={0}
          onDragStart={({ target, clientX, clientY }) => {
            // console.log("onDragStart", target);
          }}
          onDrag={({
            target,
            beforeDelta,
            beforeDist,
            left,
            top,
            right,
            bottom,
            delta,
            dist,
            transform,
            clientX,
            clientY,
          }) => {
            // console.log("onDrag left, top", left, top);
            // setDiffTop(top);
            // setDiffLeft(left);
            // target!.style.left = `${left}px`;
            // target!.style.top = `${top}px`;
            // console.log("onDrag left, top", transform);

            // console.log("onDrag translate", dist);
            target.style.transform = transform;
          }}
          onDragEnd={({ target, isDrag, clientX, clientY }) => {
            let x, y;
            target.style.cssText
              .split("translate")[1]
              .split(" ")
              .map((string, index) => {
                if (index === 0) {
                  x = string.replaceAll(/([(px,])/g, "");
                  console.log("x", string, x);
                }

                if (index === 1) {
                  y = string.replaceAll(/([px)])/g, "");
                  console.log("y", string, y);
                }
              });
            console.log("onDragEnd", x, y);
          }}
          resizable={false}
          rotatable={true}
          throttleRotate={0}
          // onRotateStart={({ target, clientX, clientY }) => {
          //   console.log("onRotateStart", target);
          // }}
          onRotate={({ target, delta, dist, transform, clientX, clientY }) => {
            // console.log("onRotate", dist);
            // setNewRotation(dist);
            target.style.transform = transform;
          }}
          // onRotateEnd={({ target, isDrag, clientX, clientY }) => {
          //   console.log(", clientX, clientY", clientX, clientY);
          //   console.log("onRotateEnd", target, isDrag);
          // }}
        />
      )}
    </>
  );
};

export default ImageMovable;
