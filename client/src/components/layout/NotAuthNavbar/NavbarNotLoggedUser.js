import React, { useEffect, useState } from "react";
import { Layout, Button, Drawer } from "antd";
import { MenuOutlined } from "@ant-design/icons";
import { Link, useLocation } from "react-router-dom";
import Logo from "../../../assets/logo2.png";
import "../Navbar.css";
import AuthMenu from "./AuthMenu";
import DrawerMenu from "./DrawerMenu";

const NavbarNotLoggedUser = () => {
  const [visible, setVisible] = useState(false);
  const showDrawer = () => {
    setVisible(!visible);
  };

  // If you do not want to auto-close the mobile drawer when a path is selected
  // Delete or comment out the code block below
  // From here
  let { pathname: location } = useLocation();
  useEffect(() => {
    setVisible(false);
  }, [location]);
  // Upto here

  return (
    <nav className="navbar">
      <Layout>
        <Layout.Header className="nav-header">
          <Link to="/">
            <div className="logo">
              <img src={Logo} alt="" />
            </div>
          </Link>

          <div className="navbar-menu">
            <div className="rightMenuNotLogin">
              <AuthMenu mode="inline" />
            </div>
          </div>
        </Layout.Header>
      </Layout>
    </nav>
  );
};

export default NavbarNotLoggedUser;
