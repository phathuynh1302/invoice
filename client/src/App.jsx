import React, { useEffect } from "react";
import { Routes, useLocation } from "react-router-dom";
import { Suspense } from "react";
import { Route } from "react-router-dom";
import "./css/scss/style.scss";

import "aos/dist/aos.css";
import "./css/style.css";

import AOS from "aos";

import { Spin } from "antd";
import UserProfile from "./views/UserProfile";
import AuthContextProvider from "./contexts/AuthContext";
import Auth from "./views/Auth";
import ProtectedRoute from "./routes/ProtectedRoute";

function App() {
  const location = useLocation();

  const loading = (
    <div className="pt-72 text-center">
      <Spin tip="Loading" size="large">
        <div className="content" />
      </Spin>{" "}
    </div>
  );
  const HomeNotAuthenticated = React.lazy(() =>
    import("./views/HomeNotAuthenticated")
  );
  const ResetPassword = React.lazy(() => import("./views/ResetPassword"));
  const DefaultLayout = React.lazy(() => import("./layout/DefaultLayout"));

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
    <AuthContextProvider>
      <Suspense fallback={loading}>
        <Routes>
          <Route exact path="/" element={<HomeNotAuthenticated />} />

          <Route exact path="/signin" element={<Auth authRoute="signin" />} />
          <Route exact path="/signup" element={<Auth authRoute="signup" />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          <Route
            path="*"
            name="Home"
            element={<ProtectedRoute component={DefaultLayout} />}
          />
        </Routes>
      </Suspense>
    </AuthContextProvider>
  );
}

export default App;
