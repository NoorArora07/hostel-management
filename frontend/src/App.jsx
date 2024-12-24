import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import SignUp2 from './Components/Login/SignUp2';
import Homepage from './Components/HomePage/homepage';;
import Mess from './Components/Mess/Mess';
import Leaves from './Components/Leaves/Leaves';
import LongLeaveForm from './Components/Leaves/LongLeaveForm';
import Complaints from './Components/Complaints/Complaints';
import Profile from './Components/Profile/Profile';
import NoPage from './Components/Login/NoPage';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/NavBar/Footer';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Login /></>
    },
    {
      path: "/Homepage",
      element: <><Homepage /></>
    },
    {
      path: "/SignUp",
      element: <SignUp />
    },
    {
      path: "/signup2",
      element: <SignUp2 />
    },
    {
      path: "/mess",
      element: <><Navbar /><Mess /><Footer /></>
    },
    {
      path: "/leaves",
      element: <><Navbar /><Leaves /><Footer /></>
    },
    {
      path: "/create-leave-request",
      element: <><Navbar /><LongLeaveForm /><Footer /></>
    },
    {
      path: "/complaints",
      element: <><Navbar /><Complaints /><Footer /></>
    },
    {
      path: "/profile",
      element: <><Navbar /><Profile /><Footer /></>
    },
    {
      path: "*",
      element: <NoPage />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
