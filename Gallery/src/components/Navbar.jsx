import React, { useState, useRef, useEffect } from "react";
import "../styles/Navbar.css";
import "../styles/LoginIcon.css";
import Logo2 from "../assets/Logo2.jsx";
import search from "../assets/search.png";
import profileIcon from "../assets/profile.png";
import { signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const [user, setUser] = useState(null);
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  useEffect(() => {
    setUser(auth.currentUser);
  }, []);

  const handleLogout = async () => {
    await signOut(auth);
    localStorage.clear();
    navigate("/");
  };

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
        setDropdownVisible(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="container">
      <nav className="navbar">
        <div className="navbar-logo">
          <div className="logo-img">
            <Logo2 W={"6rem"} H={"4.5rem"} />
          </div>
          <span className="logo-text">PixelVault</span>
        </div>

        <form action="/search/" className="search">
          <input
            name="search"
            placeholder="Search for anything"
            autoComplete="off"
          />
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

        {/* Profile Section */}
        <div className="profile-container" ref={dropdownRef}>
          <img
            src={user?.profileImage || profileIcon}
            alt="Profile"
            className="profile-icon"
            onClick={() => setDropdownVisible(!dropdownVisible)}
          />
          {dropdownVisible && (
            <div className="dropdown">
              {user && (
                <div className="dropdown-user">
                  <p>{user.displayName || user.email}</p>
                </div>
              )}
              <button onClick={handleLogout} className="dropdown-item">
                Logout
              </button>
            </div>
          )}
        </div>
      </nav>
    </div>
  );
};

export default Navbar;
