import React from "react";
import "../styles/Navbar.css";
import Logo2 from '../assets/Logo2.jsx';
import search from '../assets/search.png';

const Navbar = () => {
  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="logo-img">
            <Logo2 W={'6rem'} H={'4.5rem'} />
          </div>
          <span className="logo-text">PixelVault</span>
        </div>
        <form action="/search/" className="search">
          <input name="search"  placeholder="Search for anything" autocomplete="off" />
          <button type="submit" className="submit-button">
          <img src={search} alt="search-icon" />
          </button>
        </form>
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
              <a href="#">Plans</a>
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
