import React from "react";
import { node } from "prop-types";
import { Layout } from "antd";
import "./style.css";

const { Header } = Layout;

const header = props => {
  return (
    <Header {...props} className="header-base">
      {props.children}
    </Header>
  );
};

header.propTypes = { children: node };

export default header;
