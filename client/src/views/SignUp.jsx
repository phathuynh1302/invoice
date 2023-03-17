import React, { useContext, useEffect } from "react";

import PageIllustration from "../components/PageIllustration";
import HeaderNotAuthenticated from "../components/HeaderNotAuthenticated";
import { Link } from "react-router-dom";
import SignUpForm from "../components/SignUpForm";
import { AuthContext } from "../contexts/AuthContext";
import { notification } from "antd";

function SignUp() {
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
    <div className="flex flex-col min-h-screen overflow-hidden">
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
          <SignUpForm />
        </section>
      </main>
    </div>
  );
}

export default SignUp;
