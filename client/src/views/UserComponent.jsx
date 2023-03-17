import React from "react";
import { Route } from "react-router-dom";
import HistoryInvoice from "./HistoryInvoice";
import HomeAuthenticated from "./HomeAuthenticated";
import UserProfile from "./UserProfile";

const UserComponent = () => {
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

        <section className="relative">
          <Switch>
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
          </Switch>
        </section>
      </main>
    </div>
  );
};

export default UserComponent;
