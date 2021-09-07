import React, { useState } from "react";
import Moveable from "react-moveable";
import { Box } from "@chakra-ui/react";

const ImageMovable = () => {
  // change compared to data saved in databases. Should calculate the new x & y save them to databases, also use that as init value
  const [diffTop, setDiffTop] = useState(0);
  const [diffLeft, setDiffLeft] = useState(0);
  const [newRotation, setNewRotation] = useState(0); // Float. Will need to init here used data from databases

  return (
    <>
      <Box
        width="300px"
        height="300px"
        bg="red"
        color="white"
        transform="translate(299px, 1470px)"
        className="target"
      >
        x {diffTop} y {diffLeft} rotate {newRotation}
      </Box>
      <Moveable
        target={document.querySelector(".target")}
        container={document.querySelector(".movableParent")}
        origin={true}
        snappable={true}
        bounds={{ left: 0, top: 0, right: 1500, bottom: 1900 }}
        /* draggable */
        draggable={true}
        throttleDrag={0}
        onDragStart={({ target, clientX, clientY }) => {
          console.log("onDragStart", target);
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
          console.log("onDrag left, top", left, top);
          setDiffTop(top);
          setDiffLeft(left);
          // target!.style.left = `${left}px`;
          // target!.style.top = `${top}px`;
          console.log("onDrag left, top", transform);

          console.log("onDrag translate", dist);
          target.style.transform = transform;
        }}
        onDragEnd={({ target, isDrag, clientX, clientY }) => {
          console.log(", clientX, clientY", clientX, clientY);
          console.log("onDragEnd", target, isDrag);
        }}
        resizable={false}
        /* rotatable */
        rotatable={true}
        throttleRotate={0}
        onRotateStart={({ target, clientX, clientY }) => {
          console.log("onRotateStart", target);
        }}
        onRotate={({ target, delta, dist, transform, clientX, clientY }) => {
          console.log("onRotate", dist);
          setNewRotation(dist);
          target.style.transform = transform;
        }}
        onRotateEnd={({ target, isDrag, clientX, clientY }) => {
          console.log(", clientX, clientY", clientX, clientY);
          console.log("onRotateEnd", target, isDrag);
        }}
      />
    </>
  );
};

export default ImageMovable;
