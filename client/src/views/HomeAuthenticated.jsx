import React, { useContext, useEffect } from "react";

import FeaturesBlocks from "../components/FeaturesBlocks";
import FeaturesZigZag from "../components/FeaturesZigzag";
import Testimonials from "../components/Testimonials";
import Newsletter from "../components/Newsletter";
import UploadHome from "../components/UploadHome";
import { notification } from "antd";
import { AuthContext } from "../contexts/AuthContext";

function HomeAuthenticated() {
  const [api, contextHolder] = notification.useNotification();

  const {
    showToast: { show, message, type },
    setShowToast,
  } = useContext(AuthContext);
  console.log(show, message, type);
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
    <>
      {contextHolder}
      <UploadHome />
      <FeaturesBlocks />
      <FeaturesZigZag />
      <Testimonials />
      <Newsletter />
    </>
  );
}

export default HomeAuthenticated;
