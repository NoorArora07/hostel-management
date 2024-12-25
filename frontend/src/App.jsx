import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import Login from './Components/Login/Login';
import SignUp from './Components/Login/SignUp';
import SignUp2 from './Components/Login/SignUp2';
import WardenLogin from './Components/Login/WardenLogin';
import Homepage from './Components/HomePage/homepage';
import WardenDash from './Components/Warden/WardenDash';
import Mess from './Components/Mess/Mess';
import MessLeaveForm from './Components/Mess/mess-leave-form';
import LeavesDash from './Components/Leaves/LeavesDash';
import LongLeavesView from './Components/Leaves/LongLeavesView';
import LongLeaveForm from './Components/Leaves/LongLeaveForm';
import LongLeavesApprove from './Components/Warden/LongLeavesApprove';
import Complaints from './Components/Complaints/Complaints';
import Profile from './Components/Profile/Profile';
import NoPage from './Components/Login/NoPage';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/NavBar/Footer';
import WardenNavbar from './Components/Warden/WardenNavbar';

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
      path: "/WardenDash",
      element: <><WardenNavbar /><WardenDash /></>
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
      path: "/WardenLogin",
      element: <WardenLogin />
    },
    {
      path: "/mess",
      element: <><Navbar /><Mess /><Footer /></>
    },
    {
      path: "/mess-leave-form",
      element: <><Navbar /><MessLeaveForm /><Footer /></>
    },
    {
      path: "/leaves",
      element: <><Navbar /><LeavesDash /><Footer /></>
    },
    {
      path: "/LongLeavesView",
      element: <><Navbar /><LongLeavesView /><Footer /></>
    },
    {
      path: "/create-leave-request",
      element: <><Navbar /><LongLeaveForm /><Footer /></>
    },
    {
      path: "/LongLeavesApprove",
      element: <><WardenNavbar /><LongLeavesApprove /><Footer /></>
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
