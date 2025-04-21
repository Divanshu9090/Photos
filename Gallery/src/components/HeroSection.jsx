import React from "react";
import NavBar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import UploadBtn from "./UploadBtn.jsx";
import "../styles/UploadBtn.css";

const HeroSection = () => {
  return (
    <div className="HeroSection">
      <NavBar />
      <div className="btn-main">
        <UploadBtn />
      </div>

      <div className="main"></div>
      <Footer />
    </div>
  );
};

export default HeroSection;
