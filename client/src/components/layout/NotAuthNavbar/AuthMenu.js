import React from "react";
import { Avatar, Menu } from "antd";
import { LogoutOutlined, LoginOutlined, UserOutlined } from "@ant-design/icons";

const AuthMenu = ({ mode }) => {
  return (
    <Menu mode={mode} theme="light">
      <Menu.SubMenu
        title={
          <>
            <Avatar icon={<UserOutlined />} />
          </>
        }
      >
        <Menu.Item key="log-in">
          <LoginOutlined /> Login
        </Menu.Item>
        <Menu.Item key="log-out">
          <LogoutOutlined /> Logout
        </Menu.Item>
      </Menu.SubMenu>
    </Menu>
  );
};

export default AuthMenu;
