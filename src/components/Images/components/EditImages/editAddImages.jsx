import React, { useState, useEffect } from "react";
import ImageUploading from "react-images-uploading";
import { Box, Image, Button, Icon, Tooltip } from "@chakra-ui/react";
import { BiPlus } from "react-icons/bi";
import { useDispatch } from "react-redux";

const AddMoreEditImages = ({ editImage, addImages, setAddImages }) => {
  const [images, setImages] = useState([]);
  const maxCapImagesLength = 5;
  const currentMaxNumber = maxCapImagesLength - editImage.list.length;

  const onChange = (imageList, addUpdateIndex) => {
    setImages(imageList);
    setAddImages([...addImages, ...imageList]);
  };

  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={currentMaxNumber}
      dataURLKey="data_url"
    >
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        <Box display="flex" width="100%" className="upload__image-wrapper">
          <Box display="flex" flexDirection="column" w="100%">
            <Tooltip
              label="Add more images"
              aria-label="A tooltip"
              placement="right-start"
            >
              <Button
                onClick={onImageUpload}
                bg={images.length === currentMaxNumber ? "#adaaaa" : "black"}
                cursor={
                  images.length === currentMaxNumber ? "not-allowed" : "pointer"
                }
                color="white"
                _hover={{
                  bg:
                    images.length === currentMaxNumber ? "#adaaaa" : "#363533",
                }}
                alignSelf="center"
                width="80px"
                height="80px"
                clipPath="polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)"
                mb="8"
                {...dragProps}
              >
                <Icon as={BiPlus} width="36px" height="36px" />
              </Button>
            </Tooltip>

            <Box display="flex" flexDirection="column" gridGap="2">
              {imageList.map((image, index) => (
                <Box display="flex" key={index} className="image-item">
                  <Image
                    src={image["data_url"]}
                    alt=""
                    width="400px"
                    height="300px"
                  />
                  <Button
                    onClick={() => {
                      onImageRemove(index);
                    }}
                    bg="black"
                    color="white"
                    _hover={{
                      bg: "#363533",
                    }}
                    ml={4}
                    {...dragProps}
                  >
                    Discard Preview
                  </Button>
                </Box>
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </ImageUploading>
  );
};

export default AddMoreEditImages;
