import React, { useState, useRef, useEffect, useContext } from "react";
import { Link } from "react-router-dom";
import Dropdown from "../utils/Dropdown";
import Logo from "../images/logo.png";
import { UserOutlined } from "@ant-design/icons";
import { AuthContext } from "../contexts/AuthContext";

function Header() {
  const [mobileNavOpen, setMobileNavOpen] = useState(false);

  const trigger = useRef(null);
  const mobileNav = useRef(null);

  const {
    authState: { user },
    logoutUser,
    setShowToast,
  } = useContext(AuthContext);
  const logout = async () => {
    await logoutUser();
  };
  // close the mobile menu on click outside
  useEffect(() => {
    const clickHandler = ({ target }) => {
      if (!mobileNav.current || !trigger.current) return;
      if (
        !mobileNavOpen ||
        mobileNav.current.contains(target) ||
        trigger.current.contains(target)
      )
        return;
      setMobileNavOpen(false);
    };
    document.addEventListener("click", clickHandler);
    return () => document.removeEventListener("click", clickHandler);
  });

  // close the mobile menu if the esc key is pressed
  useEffect(() => {
    const keyHandler = ({ keyCode }) => {
      if (!mobileNavOpen || keyCode !== 27) return;
      setMobileNavOpen(false);
    };
    document.addEventListener("keydown", keyHandler);
    return () => document.removeEventListener("keydown", keyHandler);
  });

  return (
    <header className="absolute z-30 w-full  bg-slate-800">
      <div className="max-w-7xl px-4 mx-auto sm:px-6">
        <div className="flex items-center justify-between h-20">
          {/* Site branding */}
          <div className="mr-4 shrink-0">
            {/* Logo */}
            <Link to="/home" className="block" aria-label="Cruip">
              <img
                className="text-purple-600 fill-current w-28 h-28"
                viewBox="0 0 32 32"
                src={Logo}
              />
            </Link>
          </div>

          {/* Desktop navigation */}
          <nav className="hidden md:flex md:grow">
            {/* Desktop menu links */}
            <ul className="flex flex-wrap items-center justify-end grow">
              <li>
                <Link
                  to="/history"
                  className="flex items-center px-4 py-2 text-gray-300 transition duration-150 ease-in-out hover:text-gray-200 ml-32"
                >
                  History
                </Link>
              </li>

              <li>
                <Link
                  to="/home"
                  className="flex items-center px-4 py-2 text-gray-300 transition duration-150 ease-in-out hover:text-gray-200"
                >
                  Home
                </Link>
              </li>
              {/* <li>
                <Link
                  to="/aboutus"
                  className="flex items-center px-4 py-2 text-gray-300 transition duration-150 ease-in-out hover:text-gray-200"
                >
                  About us
                </Link>
              </li> */}
            </ul>

            {/* Desktop sign in links */}
            <ul className="flex flex-wrap items-center justify-end grow">
              Welcome {user.userName}
              <Dropdown title={<UserOutlined />}>
                {/* 2nd level: hover */}
                <li>
                  <Link
                    to={
                      user.role === "ADMIN" ? "/admin-profile" : "/userProfile"
                    }
                    // to="/admin-profile"
                    className="flex px-4 py-2 text-sm font-medium leading-tight text-gray-400 hover:text-purple-600"
                  >
                    Profile
                  </Link>
                </li>
                <li>
                  <button
                    onClick={logout}
                    className="flex px-4 py-2 text-sm font-medium leading-tight text-gray-400 hover:text-purple-600"
                  >
                    Log out
                  </button>
                </li>
              </Dropdown>
            </ul>
          </nav>

          {/* Mobile menu */}
          <div className="md:hidden">
            {/* Hamburger button */}
            <button
              ref={trigger}
              className={`hamburger ${mobileNavOpen && "active"}`}
              aria-controls="mobile-nav"
              aria-expanded={mobileNavOpen}
              onClick={() => setMobileNavOpen(!mobileNavOpen)}
            >
              <span className="sr-only">Menu</span>
              <svg
                className="w-6 h-6 text-gray-300 transition duration-150 ease-in-out fill-current hover:text-gray-200"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <rect y="4" width="24" height="2" rx="1" />
                <rect y="11" width="24" height="2" rx="1" />
                <rect y="18" width="24" height="2" rx="1" />
              </svg>
            </button>

            {/*Mobile navigation */}
            <nav
              id="mobile-nav"
              ref={mobileNav}
              className="absolute left-0 z-20 w-full px-4 overflow-hidden transition-all duration-300 ease-in-out top-full sm:px-6"
              style={
                mobileNavOpen
                  ? { maxHeight: 1000, opacity: 1 }
                  : { maxHeight: 0, opacity: 0.8 }
              }
            >
              <ul className="px-4 py-2 bg-gray-800">
                <li>
                  <Link
                    to="/home"
                    className="flex py-2 text-gray-300 hover:text-gray-200  hover:text-purple-600"
                  >
                    Home
                  </Link>
                </li>
                <li>
                  <Link
                    to="/history"
                    className="flex py-2 text-gray-300 hover:text-gray-200  hover:text-purple-600"
                  >
                    History
                  </Link>
                </li>

                {/* <li>
                  <Link
                    to="/about"
                    className="flex py-2 text-gray-300 hover:text-gray-200  hover:text-purple-600"
                  >
                    About us
                  </Link>
                </li> */}
                <li className="py-2 my-2 border-t border-b border-gray-700  hover:text-purple-600">
                  <li>
                    <Link
                      to={
                        user.role === "ADMIN"
                          ? "/admin-profile"
                          : "/userProfile"
                      }
                      // to="/admin-profile"
                      className="flex py-2 text-sm font-medium leading-tight text-gray-400 hover:text-purple-600"
                    >
                      Profile
                    </Link>
                  </li>
                  <li>
                    <button
                      onClick={logout}
                      className="flex py-2 text-sm font-medium leading-tight text-gray-400 hover:text-purple-600"
                    >
                      Log out
                    </button>
                  </li>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
