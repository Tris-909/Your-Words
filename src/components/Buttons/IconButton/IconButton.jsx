import React from "react";
import { Icon } from "@chakra-ui/react";
import "./IconButton.scss";

// Using class "hoverEffect" for parent element to toggle IconButton on hover

const IconButton = (props) => {
  return <Icon as={props.icon} className="iconButton" {...props} />;
};

export default IconButton;
