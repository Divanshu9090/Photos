import React from "react";

const Footer = () => (
  <footer className="tm-bg-gray pt-5 pb-3 tm-text-gray tm-footer">
    <div className="container-fluid tm-container-small">
      <div className="row">
        <div className="col-lg-6 col-md-12 col-12 px-5 mb-5">
          <h3 className="tm-text-primary mb-4 tm-footer-title">About PotoVault</h3>
          <p>
            PhotoVault is a photo websites.
          </p>
        </div>
        <div className="col-lg-3 col-md-6 col-sm-6 col-12 px-5 mb-5">
          <h3 className="tm-text-primary mb-4 tm-footer-title">Our Links</h3>
          <ul className="tm-footer-links pl-0">
            <li><a href="#">Support</a></li>
            <li><a href="#">Contact</a></li>
          </ul>
        </div>
      </div>
      <div className="row">
        <div className="col-lg-8 col-md-7 col-12 px-5 mb-3">
          © 2025 PhotoVault. All rights reserved.
        </div>
      </div>
    </div>
  </footer>
);

export default Footer;
