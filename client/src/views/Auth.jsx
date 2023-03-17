import { useContext } from "react";
import { AuthContext } from "../contexts/AuthContext";
import { Navigate } from "react-router-dom";
import SignIn from "./SignIn";
import SignUp from "./SignUp";

const Auth = ({ authRoute }) => {
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);

  let body;

  if (isAuthenticated && user.role === "ADMIN")
    return <Navigate to="/dashboard" />;
  else if (isAuthenticated && user.role === "USER")
    return <Navigate to="/home" />;
  else
    body = (
      <>
        {authRoute === "signin" && <SignIn />}
        {authRoute === "signup" && <SignUp />}
      </>
    );
  return <>{body}</>;
};

export default Auth;
