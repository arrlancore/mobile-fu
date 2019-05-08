import { Layout } from "antd";
import React from "react";
import { node } from "prop-types";

function layout({ children }) {
  return (
    <Layout style={{ background: "#fff", height: "100vh" }}>{children}</Layout>
  );
}

layout.propTypes = { children: node };

export default layout;
