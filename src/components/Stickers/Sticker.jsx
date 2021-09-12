import React, { useState } from "react";
import { Image, Button, Input } from "@chakra-ui/react";
import { Rnd } from "react-rnd";
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
        id={"12345"}
        src={`https://amplifytutorialoneeb71ffcb9e1e4ab09d46e7e344ec4231901-frei.s3.ap-southeast-2.amazonaws.com/private/ap-southeast-2%3A6f82b9fd-9b91-471a-850b-31f48b226aa7/1631413917815-undefined`}
        alt="dummy"
        draggable={false}
      />
      {/* <Button onClick={() => test(dummySticker)}> PUSH </Button> */}
    </Rnd>
  );
};

export default Sticker;
