import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Auth from './components/AuthForm.jsx';
import Home from './components/HeroSection.jsx';
import SignupDetail from './components/SignupDetail.jsx';

const router = createBrowserRouter([
  {
    path: '/',
    element: <Auth />,
  },
  {
    path: '/home',
    element: <Home />,
  },
  {
    path: '/Signupdetails',
    element: <SignupDetail />,
  },
]);

function App() {
  return (
    <>
      <RouterProvider router={router} />
    </>
  );
}

export default App;