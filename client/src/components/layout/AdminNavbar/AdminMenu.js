import React from "react";
import { Menu } from "antd";
import { Link } from "react-router-dom";

const AdminMenu = ({ mode }) => {
  return (
    <Menu
      theme="light"
      className="history"
      mode={mode}
      defaultSelectedKeys={["Dashboard"]}
    >
      <Menu.Item key="1">Dashboard</Menu.Item>
      <Menu.Item key="2">Manage Template</Menu.Item>
      <Menu.Item key="3">Manage User</Menu.Item>
    </Menu>
  );
};

export default AdminMenu;
