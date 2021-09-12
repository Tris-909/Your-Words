import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Box, Icon } from "@chakra-ui/react";
import { BiUpload } from "react-icons/bi";
import { uploadToS3 } from "libs/awsLib";

const CustomStickerUploader = ({ submitSticker }) => {
  const [images, setImages] = useState([]);

  const onChange = async (imageList, addUpdateIndex) => {
    const source = await uploadToS3(imageList[0].file);
    submitSticker(source);
    setImages([]);
  };

  return (
    <ImageUploading
      value={images}
      onChange={onChange}
      dataURLKey="data_url"
      style={{ cursor: "pointer" }}
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
        <Box
          onClick={onImageUpload}
          width="150px"
          height="150px"
          color="white"
          bg="#2c3333"
          cusror="pointer"
          display="flex"
          justifyContent="center"
          {...dragProps}
        >
          <Box
            width="100%"
            display="flex"
            margin={4}
            border="2px dashed white"
            justifyContent="center"
            alignItems="center"
            flexDirection="column"
          >
            <Icon as={BiUpload} color="white" width="25px" height="25px" />
            <Box fontSize="sm">Custom Sticker</Box>
          </Box>
        </Box>
      )}
    </ImageUploading>
  );
};

export default CustomStickerUploader;
