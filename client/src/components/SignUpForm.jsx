import React, { useContext, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";
import AlertMessage from "./Alert";

const SignUpForm = () => {
  //context
  const { registerUser, setShowToast } = useContext(AuthContext);

  //local state
  const [registerForm, setRegisterForm] = useState({
    userName: "",
    password: "",
    confirmPassword: "",
    email: "",
  });
  const [alert, setAlert] = useState(null);

  const { userName, password, confirmPassword, email } = registerForm;

  const onChangeRegisterForm = (event) =>
    setRegisterForm({
      ...registerForm,
      [event.target.name]: event.target.value,
    });

  const register = async (event) => {
    event.preventDefault();

    try {
      if (password !== confirmPassword) {
        await setShowToast({
          show: true,
          message: "Password do not match",
          type: "error",
        });
        setRegisterForm({
          ...registerForm,
          password: "",
          confirmPassword: "",
        });
      } else {
        const registerData = await registerUser({ userName, password, email });
        if (registerData.status === true) {
          await setShowToast({
            show: true,
            message: "Sign up successfully",
            type: "success",
          });
        }
        // console.log(registerData);
        if (registerData.status === false) {
          await setShowToast({
            show: true,
            message: "Cannot create account",
            type: "error",
          });
        }
      }
    } catch (error) {
      await setShowToast({
        show: true,
        message: "Internal server error",
        type: "error",
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto px-4 sm:px-6" data-aos="fade-up">
      <div className="pt-32 pb-12 md:pt-40 md:pb-20">
        {/* Page header */}
        <div className="max-w-3xl mx-auto text-center pb-12 md:pb-0">
          <h1 className="h1">Sign Up</h1>
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
          <form onSubmit={register}>
            <div className="flex flex-wrap -mx-3 mb-4">
              <AlertMessage info={alert} />

              <div className="w-full px-3">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="userName"
                >
                  Username <span className="text-red-600">*</span>
                </label>
                <input
                  id="userName"
                  onChange={onChangeRegisterForm}
                  value={userName}
                  name="userName"
                  type="text"
                  minLength={8}
                  className="form-input w-full text-gray-300"
                  placeholder="Enter Username"
                  pattern="[A-Za-z][A-Za-z0-9_]{7,29}$"
                  title="Username should start with an alphabet, no special characters and length constraint was 8-30"
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
                  Password <span className="text-red-600">*</span>
                </label>
                <input
                  id="password"
                  type="password"
                  pattern="(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}"
                  title="Minimum eight characters, at least one uppercase letter, one lowercase letter and one number"
                  onChange={onChangeRegisterForm}
                  value={password}
                  name="password"
                  minLength={8}
                  className="form-input w-full text-gray-300"
                  placeholder="Enter password (at least 8 characters)"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="passwordConfirm"
                >
                  Confirm Password <span className="text-red-600">*</span>
                </label>
                <input
                  id="passwordConfirm"
                  type="password"
                  onChange={onChangeRegisterForm}
                  value={confirmPassword}
                  name="confirmPassword"
                  min={8}
                  className="form-input w-full text-gray-300"
                  placeholder="Confirm your password"
                  required
                />
              </div>
            </div>
            <div className="flex flex-wrap -mx-3 mb-4">
              <div className="w-full px-3">
                <label
                  className="block text-gray-300 text-sm font-medium mb-1"
                  htmlFor="email"
                >
                  Email <span className="text-red-600">*</span>
                </label>
                <input
                  id="email"
                  type="email"
                  onChange={onChangeRegisterForm}
                  value={email}
                  name="email"
                  // pattern="[\w-\.]+@([\w-]+\.)+[\w-]{2,4}"
                  // title="Invalid Email"
                  className="form-input w-full text-gray-300"
                  placeholder="Enter email"
                  required
                />
              </div>
            </div>

            <div className="flex flex-wrap -mx-3 mt-6">
              <div className="w-full px-3">
                <button className="btn text-white bg-purple-600 hover:bg-purple-700 w-full">
                  Sign up
                </button>
              </div>
            </div>
          </form>
          <div className="text-gray-400 text-center mt-6">
            Already have account?{" "}
            <Link
              to="/signin"
              className="text-purple-600 hover:text-gray-200 transition duration-150 ease-in-out"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SignUpForm;
