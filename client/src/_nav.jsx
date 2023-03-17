import React from "react";
import CIcon from "@coreui/icons-react";
import { cilCalendar, cilPeople, cilSpeedometer, cilUser } from "@coreui/icons";
import { CNavGroup, CNavItem, CNavTitle } from "@coreui/react";

const _nav = [
  {
    component: CNavItem,
    name: "Dashboard",
    to: "/dashboard",
    icon: <CIcon icon={cilSpeedometer} customClassName="nav-icon" />,
    badge: {
      color: "info",
      text: "NEW",
    },
  },

  {
    component: CNavItem,
    name: "Manage User",
    to: "/users",
    icon: <CIcon icon={cilPeople} customClassName="nav-icon" />,
  },
  {
    component: CNavItem,
    name: "Account",
    to: "/admin-profile",
    icon: <CIcon icon={cilUser} customClassName="nav-icon" />,
  },
];

export default _nav;
