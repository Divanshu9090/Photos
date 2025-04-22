import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "./components/AuthForm.jsx";
import Home from "./pages/Home.jsx";
import SignupDetail from "./components/SignupDetail.jsx";
import ProtectedRoute from "./components/ProtectedRoute.jsx";
import PublicRoute from "./components/PublicRoute.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: (
      <PublicRoute>
        <Auth />
      </PublicRoute>
    ),
  },
  {
    path: "/home",
    element: (
      <ProtectedRoute>
        <Home />
      </ProtectedRoute>
    ),
  },
  {
    path: "/Signupdetails",
    element: (
      <ProtectedRoute allowIfNewlySignedUp={true}>
        <SignupDetail />
      </ProtectedRoute>
    ),
  },
]);

function App() {
  return <RouterProvider router={router} />;
}

export default App;