import React from "react";
import { Menu } from "antd";
import { LogoutOutlined, LoginOutlined } from "@ant-design/icons";

const DrawerMenu = ({ mode }) => {
  return (
    <Menu mode={mode}>
      <Menu.Item key="log-in">
        <LoginOutlined /> Login
      </Menu.Item>
      <Menu.Item key="log-out">
        <LogoutOutlined /> Logout
      </Menu.Item>
    </Menu>
  );
};

export default DrawerMenu;
