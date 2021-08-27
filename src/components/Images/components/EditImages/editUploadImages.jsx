import React, { useState } from "react";
import ImageUploading from "react-images-uploading";
import { Box, Icon, Image, Button } from "@chakra-ui/react";
import { BiRightArrowAlt } from "react-icons/bi";
import { deleteSingleImageInImagesLocally } from "redux/features/images/images";
import { useDispatch } from "react-redux";

const PreviewEditImage = ({ parentId, id }) => {
  const [images, setImages] = useState([]);
  const dispatch = useDispatch();

  const onChange = (imageList, addUpdateIndex) => {
    // data for submit
    console.log(imageList, addUpdateIndex);
    setImages(imageList);
  };

  return (
    <ImageUploading value={images} onChange={onChange} dataURLKey="data_url">
      {({
        imageList,
        onImageUpload,
        onImageRemoveAll,
        onImageUpdate,
        onImageRemove,
        isDragging,
        dragProps,
      }) => (
        // write your building UI
        <Box display="flex" ml={4} className="upload__image-wrapper">
          <Box display="flex" flexDirection="column">
            <Button
              style={isDragging ? { color: "red" } : undefined}
              onClick={onImageUpload}
              bg="black"
              color="white"
              _hover={{
                bg: "#363533",
              }}
              mr={4}
              {...dragProps}
            >
              Update
            </Button>
            <Button
              onClick={() => {
                dispatch(
                  deleteSingleImageInImagesLocally({
                    imagesId: parentId,
                    id: id,
                  })
                );
              }}
              bg="black"
              color="white"
              _hover={{
                bg: "#363533",
              }}
              mt={4}
              mr={4}
              {...dragProps}
            >
              Delete
            </Button>
            {images.length > 0 && (
              <Button
                onClick={() => onImageRemove(0)}
                bg="black"
                color="white"
                _hover={{
                  bg: "#363533",
                }}
                mt={4}
                mr={4}
                {...dragProps}
              >
                Discard Preview
              </Button>
            )}
          </Box>

          {imageList.map((image, index) => (
            <Box display="flex" key={index} className="image-item">
              <Image
                src={image["data_url"]}
                alt=""
                width="400px"
                height="300px"
              />
            </Box>
          ))}
        </Box>
      )}
    </ImageUploading>
  );
};

export default PreviewEditImage;
