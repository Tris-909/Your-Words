import React from "react";
import ImageUploading from "react-images-uploading";
import { Button, Image, Box, Tooltip, Icon } from "@chakra-ui/react";
import { BiPlus, BiX } from "react-icons/bi";

const UploadImageNote = ({ images, onChange }) => {
  return (
    <ImageUploading
      multiple
      value={images}
      onChange={onChange}
      maxNumber={1}
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
                onClick={() => {
                  if (images.length === 0) {
                    onImageUpload();
                  }
                }}
                bg={images.length === 1 ? "#adaaaa" : "black"}
                cursor={images.length === 1 ? "not-allowed" : "pointer"}
                color="white"
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
                    width="100%"
                    height="500px"
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
                    <Icon as={BiX} width="36px" height="36px" />
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

export default UploadImageNote;
