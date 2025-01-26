import React from "react";
import "../styles/Navbar.css"; // Import CSS styling

const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-logo">
          {/* <div className="logo-icon">
          PixelVault
        </div> */}
          <span className="logo-text">PixelVault</span>
        </div>
        <ul className="navbar-links">
          <li className="nav-item">
            <a href="#" className="active">
              Photos
            </a>
          </li>
          <li className="nav-item">
            <a href="#">Videos</a>
          </li>
          <li className="nav-item">
            <a href="#">About</a>
          </li>
          <li className="nav-item">
            <a href="#">Contact</a>
          </li>
        </ul>
      </nav>
    </div>
  );
};

export default Navbar;
