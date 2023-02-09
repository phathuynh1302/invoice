import {
  DribbbleSquareFilled,
  FacebookFilled,
  LinkedinFilled,
  TwitterSquareFilled,
} from "@ant-design/icons";
import React from "react";
import Logo from "../../../assets/logo2.png";

import "./Footer.css";

class Footer extends React.Component {
  render() {
    return (
      <footer className="site-footer">
        <div className="container">
          <div className="row">
            <div className="col-sm-12 col-md-4">
              <img src={Logo} width="90%" height="170px" />
            </div>
            <div className="col-sm-12 col-md-4">
              <h6 className="about-title">About us</h6>
              <p className="about-us">
                E-Invoice Convert to XLS is a premier platform dedicated to
                providing businesses with efficient and cost-effective solutions
                for converting invoices into digital spreadsheets. Our platform
                is designed to meet the needs of businesses of all sizes,
                offering fast, accurate, and reliable conversion services.
              </p>
            </div>
            <div className="col-sm-12 col-md-1"></div>

            <div className="col-xs-6 col-md-3">
              <h6>E-invoiceconvert</h6>
              <ul className="footer-links">
                <li>
                  <a href="#">About Us</a>
                </li>
                <li>
                  <a href="#">Contact Us</a>
                </li>
                <li>
                  <a href="#">Follow Us</a>
                </li>
                <li>
                  <a href="#">Privacy Policy</a>
                </li>
                <li>
                  <a href="#">Terms of Service</a>
                </li>
              </ul>
            </div>
          </div>
        </div>
        <div className="container">
          <div className="row">
            <div className="col-md-8 col-sm-6 col-xs-12">
              <p className="copyright-text">
                Copyright © 2023 E-Invoice Convert to XLS. All rights reserved.
              </p>
            </div>

            <div className="col-md-4 col-sm-6 col-xs-12">
              <ul className="social-icons">
                <li>
                  <a href="#">
                    <FacebookFilled />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <TwitterSquareFilled />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <DribbbleSquareFilled />
                  </a>
                </li>
                <li>
                  <a href="#">
                    <LinkedinFilled />
                  </a>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;
