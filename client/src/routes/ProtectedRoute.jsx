import { notification } from "antd";
import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const ProtectedRoute = ({ component: Component, ...rest }) => {
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);

  return isAuthenticated ? (
    <>
      <Component {...rest} />
    </>
  ) : (
    <Navigate to="/signin" />
  );
};

export default ProtectedRoute;
