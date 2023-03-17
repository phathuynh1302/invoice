import React, { useContext, useEffect } from "react";

import Header from "../components/Header";
import PageIllustration from "../components/PageIllustration";
import FeaturesBlocks from "../components/FeaturesBlocks";
import FeaturesZigZag from "../components/FeaturesZigzag";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import Banner from "../components/Banner";
import Footer from "../components/Footer";
import HeaderNotAuthenticated from "../components/HeaderNotAuthenticated";
import UploadHome from "../components/UploadHome";
import { notification } from "antd";
import { AuthContext } from "../contexts/AuthContext";

function HomeNotAuthenticated() {
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
  console.log(show, message, type);
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

        {/*  Page sections */}
        <UploadHome />
        <FeaturesBlocks />
        <FeaturesZigZag />
        <Testimonials />
      </main>

      <Banner />

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default HomeNotAuthenticated;
