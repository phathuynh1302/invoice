import React from "react";
import { NavLink } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import {
  CContainer,
  CHeader,
  CHeaderDivider,
  CHeaderNav,
  CHeaderToggler,
  CNavLink,
  CNavItem,
} from "@coreui/react";
import CIcon from "@coreui/icons-react";
import { cilBell, cilMenu } from "@coreui/icons";

import { AppBreadcrumb } from "./index";
import { AppHeaderDropdown } from "./header/index";
import logo from "../images/logo.png";

const AppHeader = () => {
  const dispatch = useDispatch();
  const sidebarShow = useSelector((state) => state.sidebarShow);

  return (
    <CHeader position="sticky" className="mb-4">
      <CContainer fluid>
        <CHeaderToggler
          className="ps-1"
          onClick={() => dispatch({ type: "set", sidebarShow: !sidebarShow })}
        >
          <CIcon icon={cilMenu} size="lg" />
        </CHeaderToggler>

        <CHeaderNav className="d-md-flex me-auto ">
          <CNavItem>
            <CNavLink to="/dashboard" component={NavLink} className="font-bold">
              Dashboard
            </CNavLink>
          </CNavItem>

          <CNavItem>
            <CNavLink to="/users" component={NavLink} className="font-bold">
              Manage user
            </CNavLink>
          </CNavItem>
        </CHeaderNav>
        {/* <CHeaderNav>
          <span className="notification-count">
            <p className="ml-1">5</p>
          </span>
          <CIcon icon={cilBell} size="xxl" className="mt-2" />
        </CHeaderNav> */}
        <CHeaderNav className="ms-3">
          <AppHeaderDropdown />
        </CHeaderNav>
      </CContainer>
      <CHeaderDivider />
      <CContainer fluid>
        <AppBreadcrumb />
      </CContainer>
    </CHeader>
  );
};

export default AppHeader;
