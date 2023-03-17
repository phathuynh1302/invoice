import { createContext, useEffect, useReducer, useState } from "react";
import { authReducer } from "../reducers/authReducer";
import axios from "axios";
import { LOCAL_STORAGE_NAME } from "./constants";

export const AuthContext = createContext();

const AuthContextProvider = ({ children }) => {
  const [authState, dispatch] = useReducer(authReducer, {
    authLoading: true,
    isAuthenticated: false,
    user: null,
  });

  const [showToast, setShowToast] = useState({
    show: false,
    message: "",
    type: null,
  });

  // const [res, setRes] = useState(null);
  //Authenticate the user
  // Authenticate user
  const loadUser = async () => {
    try {
      const res = JSON.parse(sessionStorage.getItem(LOCAL_STORAGE_NAME));
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: true, user: res.data },
      });
    } catch (error) {
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
    }
  };

  useEffect(() => {
    loadUser();
  }, []);
  //Login
  const loginUser = async (userForm) => {
    try {
      const response = await axios.post(
        "https://localhost:44327/api/Authentication/login",
        userForm
      );
      if (response.data.status === true)
        sessionStorage.setItem(
          LOCAL_STORAGE_NAME,
          JSON.stringify(response.data)
        );

      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: true, user: response.data.data },
      });
      setShowToast({
        show: true,
        message: "Login Successfully",
        type: "success",
      });
      await loadUser();

      return response.data;
    } catch (error) {
      dispatch({
        type: "SET_AUTH",
        payload: { isAuthenticated: false, user: null },
      });
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //Logout
  const logoutUser = () => {
    sessionStorage.removeItem(LOCAL_STORAGE_NAME);

    dispatch({
      type: "SET_AUTH",
      payload: { isAuthenticated: false, user: null },
    });
    setShowToast({
      show: true,
      message: "Log out Successfully",
      type: "success",
    });
  };

  //Register
  const registerUser = async (userForm) => {
    try {
      const response = await axios.post(
        "https://localhost:44327/api/Authentication/createAccount",
        userForm
      );
      console.log(response);
      if (response.data.status === true) return response.data;
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  const updateProfile = async (updateProfileForm) => {
    console.log(updateProfileForm);
    try {
      if (updateProfileForm.password == "") {
        const response = await axios.post(
          "https://localhost:44327/api/Authentication/updateAccount",
          {
            userName: updateProfileForm.userName,
            email: updateProfileForm.email,
          }
        );
        if (response.data.status == true) return response.data;
      } else {
        const response = await axios.post(
          "https://localhost:44327/api/Authentication/updateAccount",
          updateProfileForm
        );
        if (response.data.status == true) return response.data;
      }

      console.log(response);
    } catch (error) {
      if (error.response.data) return error.response.data;
      else return { success: false, message: error.message };
    }
  };
  //context data
  const authContextData = {
    loginUser,
    updateProfile,
    logoutUser,
    registerUser,
    authState,
    showToast,
    setShowToast,
  };
  //return provider
  return (
    <AuthContext.Provider value={authContextData}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthContextProvider;
