import React from "react";
import { node } from "prop-types";
import { Button } from "antd";
import "./style.css";

const button = ({ children, ...rest }) => {
  return (
    <Button {...rest} className="button-base">
      {children}
    </Button>
  );
};

button.propTypes = { children: node };

export default button;
