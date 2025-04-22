import React, { useState } from "react";
import { auth } from "../utils/firebase";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
} from "firebase/auth";
import { useNavigate } from "react-router-dom";
import "../styles/auth.css";

const AuthForm = () => {
  const [isSignUp, setIsSignUp] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleToggle = () => {
    setIsSignUp(!isSignUp);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (isSignUp) {
        await createUserWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        localStorage.setItem("newlySignedUp", "true"); // mark new sign-up
        navigate("/Signupdetails");
      } else {
        await signInWithEmailAndPassword(
          auth,
          formData.email,
          formData.password
        );
        localStorage.setItem("newlySignedUp", "false"); // login
        navigate("/home");
      }
    } catch (error) {
      let em = error.message
        .replace("Firebase:", "")
        .replace("(", " ")
        .replace(").", "");
      setErrorMessage(em);
      console.error("Authentication error:", error);
    }
  };

  return (
    <div id="body-Authform">
      <div className={`container ${isSignUp ? "active" : ""}`} id="AuthForm">
        <div className="form-container sign-up">
          <form onSubmit={handleSubmit}>
            <h1>Create Account</h1>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}

            <input
              type="email"
              name="email"
              placeholder="Enter E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign Up</button>
          </form>
        </div>

        <div className="form-container sign-in">
          <form onSubmit={handleSubmit}>
            <h1>Sign In</h1>
            {errorMessage && (
              <div className="error-message">{errorMessage}</div>
            )}
            <input
              type="email"
              name="email"
              placeholder="Enter E-mail"
              value={formData.email}
              onChange={handleChange}
              required
            />
            <input
              type="password"
              name="password"
              placeholder="Enter Password"
              value={formData.password}
              onChange={handleChange}
              required
            />
            <button type="submit">Sign In</button>
          </form>
        </div>

        <div className="toggle-container">
          <div className="toggle">
            <div className="toggle-panel toggle-left">
              <h1>
                Welcome To <br /> PixelVault
              </h1>
              <p>Sign in With ID & Password</p>
              <button onClick={handleToggle}>Sign In</button>
            </div>
            <div className="toggle-panel toggle-right">
              <h1>Hi User</h1>
              <p>
                Join "PixelVault" to Emphasizing storage and security for your
                memories.
              </p>
              <button onClick={handleToggle}>Sign Up</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AuthForm;
