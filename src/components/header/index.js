import React from "react";
import { node } from "prop-types";
import { Layout, Avatar, Col, Row, Menu, Dropdown, Icon } from "antd";
import PhotoTemp from "assets/image/temp/Photo.png";
import IconBell from "assets/icon/Bell.svg";
import IconMessages from "assets/icon/Messages.svg";
import ImageIcon from "components/image-icon";
import MainMenu from "./menu";
import "./style.css";

const { Header } = Layout;

const menu = (
  <Menu mode="horizontal" onClick={handleMenuClick}>
    <Menu.Item key="1">My Profile</Menu.Item>
    <Menu.Item key="2">Setting</Menu.Item>
    <Menu.Item key="3">Logout</Menu.Item>
  </Menu>
);

function handleMenuClick(e) {
  console.log("click", e);
}

const name = "Janne";

const header = props => {
  return (
    <>
      <Header {...props} className="header-base header-font">
        {/* {props.children} */}
        <Row
          gutter={8}
          align="middle"
          type="flex"
          justify="center"
          style={{ height: "100%" }}
        >
          <Col span={5}>
            <Avatar
              src={PhotoTemp}
              size="large"
              style={{ width: 72, height: 72, marginRight: 12 }}
            />
            <div style={{ display: "inline" }}>Hello, </div>
            <Dropdown overlay={menu}>
              <span className="primary-header-color">
                {name}
                <Icon
                  style={{
                    marginLeft: 14,
                    color: "#B9BBC5",
                    position: "relative",
                    top: 2
                  }}
                  type="caret-down"
                />
              </span>
            </Dropdown>
          </Col>
          <Col
            span={7}
            style={{
              height: "100%",
              display: "flex",
              alignItems: "center",
              borderLeft: "1px solid #efefef"
            }}
          >
            <ImageIcon src={IconBell} alt="Notification" />
            <ImageIcon src={IconMessages} alt="Messages" />
          </Col>
          <Col span={12}>
            <MainMenu />
          </Col>
        </Row>
      </Header>
      <div className="header-shadow" />
    </>
  );
};

header.propTypes = { children: node };

export default header;
