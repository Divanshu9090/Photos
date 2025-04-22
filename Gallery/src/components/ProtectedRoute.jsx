import { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { onAuthStateChanged } from "firebase/auth";
import { auth } from "../utils/firebase";

const ProtectedRoute = ({ children, allowIfNewlySignedUp = false }) => {
  const [loading, setLoading] = useState(true);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) return <div>Loading...</div>;

  const isNewlySignedUp = localStorage.getItem("newlySignedUp") === "true";

  if (!user) return <Navigate to="/" />;

  if (allowIfNewlySignedUp && isNewlySignedUp) {
    return children;
  }

  if (window.location.pathname === "/Signupdetails" && !isNewlySignedUp) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
