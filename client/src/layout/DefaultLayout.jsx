import React, { useContext, useEffect } from "react";
import { Route, Routes } from "react-router-dom";
import ProtectedRoute from "../routes/ProtectedRoute";
import Footer from "../components/Footer";
import Header from "../components/Header";
import {
  AppContent,
  AppSidebar,
  AppFooter,
  AppHeader,
} from "../components/index";
import PageIllustration from "../components/PageIllustration";
import { AuthContext } from "../contexts/AuthContext";
import { notification } from "antd";

const HomeAuthenticated = React.lazy(() =>
  import("../views/HomeAuthenticated")
);
const HistoryInvoice = React.lazy(() => import("../views/HistoryInvoice"));
const UserProfile = React.lazy(() => import("../views/UserProfile"));
const DefaultLayout = () => {
  const {
    authState: { isAuthenticated, user },
  } = useContext(AuthContext);
  if (isAuthenticated && user.role === "ADMIN")
    return (
      <div>
        <AppSidebar />

        <div className="wrapper d-flex flex-column min-vh-100 bg-light">
          <AppHeader />
          <div className="body flex-grow-1 px-3">
            <AppContent />
          </div>
          <AppFooter />
        </div>
      </div>
    );
  else if (isAuthenticated && user.role === "USER")
    return (
      <div className="flex flex-col min-h-screen overflow-hidden">
        {/*  Site header */}
        <Header />

        {/*  Page content */}
        <main className="grow">
          {/*  Page illustration */}
          <div
            className="relative max-w-6xl mx-auto h-0 pointer-events-none"
            aria-hidden="true"
          >
            <PageIllustration />
          </div>

          <section className="relative min-h-screen">
            <Routes>
              <Route
                path="/home"
                element={<ProtectedRoute component={HomeAuthenticated} />}
              />
              <Route
                path="/userProfile"
                element={<ProtectedRoute component={UserProfile} />}
              />
              <Route
                path="/history"
                element={<ProtectedRoute component={HistoryInvoice} />}
              />
            </Routes>
          </section>
        </main>
        {/*  Site footer */}
        <Footer />
      </div>
    );
};

export default DefaultLayout;
