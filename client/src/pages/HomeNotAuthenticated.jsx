import React from "react";

import Header from "../partials/Header";
import PageIllustration from "../partials/PageIllustration";
import FeaturesBlocks from "../partials/FeaturesBlocks";
import FeaturesZigZag from "../partials/FeaturesZigzag";
import Testimonials from "../partials/Testimonials";
import Newsletter from "../partials/Newsletter";
import Banner from "../partials/Banner";
import Footer from "../partials/Footer";
import HeaderNotAuthenticated from "../partials/HeaderNotAuthenticated";
import UploadHome from "../partials/UploadHome";

function HomeNotAuthenticated() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden">
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
        <Newsletter />
      </main>

      <Banner />

      {/*  Site footer */}
      <Footer />
    </div>
  );
}

export default HomeNotAuthenticated;
