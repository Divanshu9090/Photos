import React from "react";
import "../styles/Footer.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        {/* About Section */}
        <div className="footer-section">
          <h3 className="footer-title">About PIXELVAULT</h3>
          <p className="footer-text">
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Beatae
            quidem magni veritatis amet adipisci aliquid molestiae, minus alias?
            Voluptates omnis ex distinctio obcaecati,
          </p>
        </div>

        {/* Links Section */}
        <div className="footer-section our-link">
          <h3 className="footer-title">Our Links</h3>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                Our Company
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Contact
              </a>
            </li>
          </ul>
          <ul className="footer-links">
            <li>
              <a href="#" className="footer-link">
                Terms of Use
              </a>
            </li>
            <li>
              <a href="#" className="footer-link">
                Privacy Policy
              </a>
            </li>
          </ul>
        </div>

        {/* Social Media Section */}
        <div className="footer-section">
          <h3 className="footer-title">Follow Us</h3>
          <div className="social-icons">
            <a href="#" className="social-icon">
              <i className="fab fa-facebook-f"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-instagram"></i>
            </a>
            <a href="#" className="social-icon">
              <i className="fab fa-pinterest"></i>
            </a>
          </div>
        </div>
      </div>

      {/* Footer Bottom */}
      <div className="footer-bottom">
        <p>Copyright 2025 PixelVault Company. All rights reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
