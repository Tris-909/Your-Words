import React from "react";
import { Box, Image } from "@chakra-ui/react";

const StickerContainer = ({ key, src, onSubmitSticker }) => {
  return (
    <Image
      id={key}
      src={src}
      width="23%"
      margin="5px"
      padding="10px"
      cursor="pointer"
      _hover={{
        opacity: 0.5,
      }}
      onClick={() => onSubmitSticker(src)}
    />
  );
};

const PackContainer = ({ onSubmitSticker, stickerArrays }) => {
  return (
    <Box display="flex" flexDirection="column" width="100%">
      <Box display="flex" flexWrap="wrap" justifyContent="center" w="100%">
        {stickerArrays.map((item) => {
          return (
            <StickerContainer
              key={item}
              src={item}
              onSubmitSticker={onSubmitSticker}
            />
          );
        })}
      </Box>
    </Box>
  );
};

export default PackContainer;
