import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const SignInForm = () => {
  //context
  const { loginUser, setShowToast } = useContext(AuthContext);

  //local state
  const [loginForm, setLoginForm] = useState({
    userName: "",
    password: "",
  });
  const { userName, password } = loginForm;

  const onChangeLoginForm = (event) =>
    setLoginForm({ ...loginForm, [event.target.name]: event.target.value });

  const login = async (event) => {
    event.preventDefault();
    try {
      const loginData = await loginUser(loginForm);
      console.log(loginData);

      if (loginData.status === false) {
        setShowToast({
          show: true,
          message: "Your credentials have some problems",
          type: "error",
        });
      } else if (loginData.status === true) {
        setShowToast({
          show: true,
          message: "Login successfully",
          type: "success",
        });
      }
    } catch (error) {
      setShowToast({
        show: true,
        message: "Internal server error",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6">
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        {/* Page header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-0">
          <h1 className="h1">Sign in</h1>
        </div>

        {/* Form */}
        <div className="max-w-sm mx-auto">
          <div className="flex items-center my-6">
            <div
              className="border-t border-gray-200 border-dotted grow mr-3"
              aria-hidden="true"
            ></div>
            <div className="text-gray-400">Welcome to E-invoiceconvert</div>
            <div
              className="border-t border-gray-200 border-dotted grow ml-3"
              aria-hidden="true"
            ></div>
          </div>
          <form onSubmit={login}>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="userName"
                >
                  Username <span className="text-red-600">*</span>
                </label>
                <input
                  id="userName"
                  type="text"
                  name="userName"
                  value={userName}
                  onChange={onChangeLoginForm}
                  className="form-input w-full text-gray-300"
                  placeholder="Enter username"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="password"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  name="password"
                  value={password}
                  onChange={onChangeLoginForm}
                  className="form-input w-full text-gray-300"
                  placeholder="Enter password (at least 10 characters)"
                  required
                />
              </div>
            </div>
            {/* <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <div className="flex justify-between">
                  <label className="flex items-center">
                    <input type="checkbox" className="form-checkbox" />
                    <span className="text-gray-400 ml-2">
                      Keep me signed in
                    </span>
                  </label>
                  <Link
                    to="/reset-password"
                    className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
                  >
                    Forgot Password?
                  </Link>
                </div>
              </div>
            </div> */}
            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3">
                <button
                  type="submit"
                  className="btn text-white bg-purple-600 hover:bg-purple-700 w-full"
                >
                  Sign in
                </button>
              </div>
            </div>
          </form>
          <div className="text-gray-400 text-center mt-6">
            Don’t you have an account?{" "}
            <Link
              to="/signup"
              className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
            >
              Sign up
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignInForm;
