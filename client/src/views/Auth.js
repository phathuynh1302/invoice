import React from "react";
import NavbarAdmin from "../components/layout/AdminNavbar/NavbarAdmin";
import Footer from "../components/layout/Footer/Footer";
import NavbarHome from "../components/layout/HomePageUserNavbar/NavbarHome";
import NavbarNotLoggedUser from "../components/layout/NotAuthNavbar/NavbarNotLoggedUser";

const Auth = ({ authRoute }) => {
  return (
    <>
      <NavbarNotLoggedUser />
      <Footer />
    </>
  );
};

export default Auth;
