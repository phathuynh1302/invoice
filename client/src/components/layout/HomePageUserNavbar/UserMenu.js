import React from "react";
import { Menu } from "antd";

const UserMenu = ({ mode }) => {
  return (
    <Menu
      theme="light"
      className="history"
      mode={mode}
      defaultSelectedKeys={["2"]}
    >
      <Menu.Item key="1">History</Menu.Item>
      <Menu.Item key="2">Home</Menu.Item>
    </Menu>
  );
};

export default UserMenu;
