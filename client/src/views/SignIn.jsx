import React, { useContext, useEffect } from "react";

import PageIllustration from "../components/PageIllustration";
import Banner from "../components/Banner";
import HeaderNotAuthenticated from "../components/HeaderNotAuthenticated";
import SignInForm from "../components/SignInForm";
import { notification } from "antd";
import { AuthContext } from "../contexts/AuthContext";

function SignIn() {
  const [api, contextHolder] = notification.useNotification();

  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(AuthContext);

  useEffect(() => {
    if (show) {
      api[type]({
        message: message,
        placement: "bottomRight",
      });
      setShowToast({ show: false, message: "", type: null });
    }
  }, [show]);

  return (
    <div
      className="flex flex-col min-h-screen overflow-hidden"
      data-aos="fade-up"
    >
      {contextHolder}
      {/*  Site header */}
      <HeaderNotAuthenticated />

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
          <SignInForm />
        </section>
      </main>

      <Banner />
    </div>
  );
}

export default SignIn;
