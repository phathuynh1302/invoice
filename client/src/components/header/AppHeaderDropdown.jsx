import React, { useContext } from "react";
import {
  CAvatar,
  CDropdown,
  CDropdownItem,
  CDropdownMenu,
  CDropdownToggle,
} from "@coreui/react";
import { cilAccountLogout, cilUser } from "@coreui/icons";
import CIcon from "@coreui/icons-react";

import userAvatar from "../../images/user.png";
import { AuthContext } from "../../contexts/AuthContext";
import { Link } from "react-router-dom";

const AppHeaderDropdown = () => {
  const { logoutUser } = useContext(AuthContext);

  return (
    <CDropdown variant="nav-item">
      <CDropdownToggle placement="bottom-end" className="py-0" caret={false}>
        <CAvatar src={userAvatar} size="md" />
      </CDropdownToggle>
      <CDropdownMenu className="pt-0" placement="bottom-end">
        <CDropdownItem href="#" className="ml-2">
          <Link to="/admin-profile"> Account</Link>
          <CIcon icon={cilUser} className="ml-3" />
        </CDropdownItem>
        <CDropdownItem className="ml-2" onClick={logoutUser}>
          Log out
          <CIcon icon={cilAccountLogout} className="ml-4" />
        </CDropdownItem>
      </CDropdownMenu>
    </CDropdown>
  );
};

export default AppHeaderDropdown;
