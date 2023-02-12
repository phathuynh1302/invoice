import React, { useEffect } from "react";
import { Routes, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import "./scss/style.scss";

import "aos/dist/aos.css";
import "./css/style.css";

import AOS from "aos";

import { Spin } from "antd";

function App() {
  const location = useLocation();

  const loading = (
    <div className="pt-72 text-center">
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>{" "}
    </div>
  );
  const HomeAuthenticated = React.lazy(() =>
    import("./pages/HomeAuthenticated")
  );
  const HomeNotAuthenticated = React.lazy(() =>
    import("./pages/HomeNotAuthenticated")
  );
  const ResetPassword = React.lazy(() => import("./pages/ResetPassword"));
  const SignIn = React.lazy(() => import("./pages/SignIn"));
  const SignUp = React.lazy(() => import("./pages/SignUp"));

  const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

  // Pages
  const Login = React.lazy(() => import("./views/pages/login/Login"));
  const Register = React.lazy(() => import("./views/pages/register/Register"));
  const Page404 = React.lazy(() => import("./views/pages/page404/Page404"));
  const Page500 = React.lazy(() => import("./views/pages/page500/Page500"));
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 600,
      easing: "ease-out-sine",
    });
  });

  useEffect(() => {
    document.querySelector("html").style.scrollBehavior = "auto";
    window.scroll({ top: 0 });
    document.querySelector("html").style.scrollBehavior = "";
  }, [location.pathname]); // triggered on route change

  return (
    <Suspense fallback={loading}>
      <Routes>
        <Route exact path="/" element={<HomeNotAuthenticated />} />
        <Route path="/home" element={<HomeAuthenticated />} />
        <Route path="/signin" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/reset-password" element={<ResetPassword />} />
        <Route path="/404" name="Page 404" element={<Page404 />} />
        <Route path="/500" name="Page 500" element={<Page500 />} />
        <Route path="*" name="Home" element={<DefaultLayout />} />
      </Routes>
    </Suspense>
  );
}

export default App;
