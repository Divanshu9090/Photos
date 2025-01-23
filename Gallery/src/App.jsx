import React, { useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Videos from "./pages/Videos";
import AuthForm from "./components/AuthForm";
import "./styles/auth.css";

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const handleAuthSuccess = () => {
    setIsAuthenticated(true);
  };

  return (
    <Router>
      {isAuthenticated ? (
        <>
          <Navbar />
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/videos" element={<Videos />} />
          </Routes>
          <Footer />
        </>
      ) : (
        <AuthForm onAuthSuccess={handleAuthSuccess} />
      )}
    </Router>
  );
};

export default App;
