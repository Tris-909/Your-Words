import React, { useState } from "react";
import { Image, Button, Input } from "@chakra-ui/react";
import { Rnd } from "react-rnd";
import dummySticker from "./creativity.png";
import { uploadToS3 } from "libs/awsLib";

const Sticker = () => {
  const [size, setSize] = useState({
    width: "150px",
    height: "150px",
  });
  const [position, setPosition] = useState({
    x: 0,
    y: 0,
  });

  const test = async (path) => {
    console.log("path", path);

    let blob = await fetch(path).then((response) => response.blob());
    //   .then((blob) => {
    //     const objectURL = URL.createObjectURL(blob);
    //     console.log("objURL", objectURL);
    //   });
    console.log("blob", blob);
    var file = new File([blob], "filename", { type: blob.type });
    console.log("file", file);
    await uploadToS3(file);
  };

  return (
    <Rnd
      size={{ width: size.width, height: size.height }}
      position={{ x: position.x, y: position.y }}
      bounds="parent"
      onDragStop={(e, d) => {
        setPosition({
          x: d.x,
          y: d.y,
        });
      }}
      onResizeStop={(e, direction, ref, delta, position) => {
        setSize({
          width: ref.style.width,
          height: ref.style.height,
        });
      }}
    >
      <Image
        id={dummySticker}
        src={dummySticker}
        alt="dummy"
        draggable={false}
      />
      <Button onClick={() => test(dummySticker)}> PUSH </Button>
    </Rnd>
  );
};

export default Sticker;
