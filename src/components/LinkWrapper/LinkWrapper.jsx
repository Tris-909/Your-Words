import React from "react";
import { Link } from "react-router-dom";
import "./LinkWrapper.scss";

export const LinkWrapper = (props) => {
  return (
    <Link to={props.to} className="linkWrapper">
      {props.children}
    </Link>
  );
};
