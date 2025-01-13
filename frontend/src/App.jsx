//main
import React from 'react';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import AccessDenied from './Components/HomePage/AccessDenied';
import Login from './Components/Login/Login';
import OtpVerificationPage from './Components/Login/forgotpwotp';
import ChangePasswordPage from './Components/Login/forgotpwnew';
import SignUp from './Components/Login/SignUp';
import SignUp2 from './Components/Login/SignUp2';
import Homepage from './Components/HomePage/homepage';
import Profile from './Components/Profile/Profile';
import NoPage from './Components/Login/NoPage';
import Navbar from './Components/Navbar/Navbar';
import Footer from './Components/NavBar/Footer';
import Photo from '@/Components/Profile/imageadd'
//warden
import WardenNavbar from './Components/Warden/WardenNavbar';
import WardenLogin from './Components/Login/WardenLogin';
import WardenDash from './Components/Warden/WardenDash';
//mess
import Mess from './Components/Mess/Mess';
import MessLeaveForm from './Components/Mess/mess-leave-form';
import MessLeavesView from './Components/Mess/mess-leave-view';
import MyCalendar from './Components/Mess/mess-schedule-view';
import MessMenu from './Components/Mess/MessMenu'; 
import WCalendar from './Components/Warden/mess-schedule-warden';
//mess payment
import MessFeeForm from './Components/Warden/MessFeeWarden'
import MessFeeDetails from './Components/Mess/payment/MessViewFee';
import Payment from './Components/Mess/payment/MessPayment';
import PaymentSuccess from './Components/Mess/payment/successpayment';
import PaymentCancel from './Components/Mess/payment/cancelledpayment';
import Stripe from './Components/Mess/payment/Stripe';
//leaves
import LeavesDash from './Components/Leaves/LeavesDash';
import LongLeavesView from './Components/Leaves/LongLeavesView';
import LongLeaveForm from './Components/Leaves/LongLeaveForm';
import LongLeavesApprove from './Components/Warden/LongLeavesApprove';
import LateLeavesView from './Components/Leaves/LateLeavesView';
import LateLeaveForm from './Components/Leaves/LateLeaveForm';
import LateLeavesApprove from './Components/Warden/LateLeavesApprove';
//complaints
import Complaints from './Components/Complaints/Complaints';
import ComplaintsForm from './Components/Complaints/complaintform';
import ComplaintsView from './Components/Complaints/complaintview';
import ComplaintsViewW from './Components/Warden/Complaintwarden';
//room alloc
import RoomsView from './Components/RoomAllocation/RoomsView';
import WaitingList from './Components/RoomAllocation/WaitingList';
//hostel fee 
import HostelPayment from './Components/HostelFee/HostelPayment';
import HostelFeeDetails from './Components/HostelFee/ViewHostelFee';
import Stripehf from './Components/HostelFee/stripehf';
import PaymentCancelhf from './Components/HostelFee/cancelhf';
import PaymentSuccesshf from './Components/HostelFee/successhf';

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <><Login /></>
    },
    {
      path: "/AccessDenied",
      element: <><AccessDenied /></>
    },
    {
      path: "/Homepage",
      element: <><Navbar /><Homepage /><Footer /></>
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
      path: "/otp-page",
      element: <><OtpVerificationPage /><Footer /></>
    },
    {
      path: "/new-password-page",
      element: <><ChangePasswordPage /><Footer /></>
    },
    {
      path: "/WardenLogin",
      element: <WardenLogin />
    },
    //mess starts here
    {
      path: "/mess",
      element: <><Navbar /><Mess /><Footer /></>
    },{
      path: "/mess-schedule-view",
      element: <><Navbar /><MyCalendar/><Footer /></>
    },
    {
      path: "/mess-menu",
      element: <><Navbar /><MessMenu/><Footer /></>
    },
    {
      path: "/view-mess-fee",
      element: <><Navbar /><MessFeeDetails/><Footer /></>
    },
    {
      path: "/add-mess-fee",
      element: <><WardenNavbar /><MessFeeForm/><Footer /></>
    },
    {
      path: "/mess-leave-view",
      element: <><Navbar /><MessLeavesView /><Footer /></>
    },
    {
      path: "/mess-leave-form", 
      element: <><Navbar /><MessLeaveForm /><Footer /></>
    },
    {
      path: "/mess-schedule-warden",
      element: <><WardenNavbar /><WCalendar /><Footer /></>
    },
    {
      path: "/mess-fee-payment",
      element: <><Navbar /><Payment /><Footer /></>
    },
    {
      path: "/success",
      element: <><Navbar /><PaymentSuccess /><Footer /></>
    },
    {
      path: "/cancel",
      element: <><Navbar /><PaymentCancel /><Footer /></>
    },
    {
      path: "/stripe",
      element: <><Stripe /><Footer /></>
    },
    //mess ends here
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
      path: "/LateLeavesView",
      element: <><Navbar /><LateLeavesView /><Footer /></>
    },
    {
      path: "/LateLeaveForm",
      element: <><Navbar /><LateLeaveForm /><Footer /></>
    },
    {
      path: "/LateLeavesApprove",
      element: <><WardenNavbar /><LateLeavesApprove /><Footer /></>
    },
    {
      path: "/complaints",
      element: <><Navbar /><Complaints /><Footer /></>
    },
    {
      path: "/complaintsform",
      element: <><Navbar /><ComplaintsForm /><Footer /></>
    },
    {
      path: "/complaintsview",
      element: <><Navbar /><ComplaintsView /><Footer /></>
    },
    {
      path: "/complaintsviewwarden",
      element: <><WardenNavbar /><ComplaintsViewW /><Footer /></>
    },
    {
      path: "/RoomsView",
      element: <><Navbar /><RoomsView/><Footer /></>
    },
    {
      path: "/WaitingList",
      element: <><Navbar /><WaitingList/><Footer /></>
    },
    {
      path: "/profile",
      element: <><Navbar /><Profile /><Footer /></>
    },
    {
      path: "/imageadd",
      element: <><Navbar /><Photo /><Footer /></>
    },
    {
      path: "/hostel-fee",
      element: <><Navbar /><HostelPayment /><Footer /></>
    },
    {
      path: "/view-hostel-fee",
      element: <><Navbar /><HostelFeeDetails /><Footer /></>
    },
    {
      path: "/stripehf",
      element: <><Navbar /><Stripehf /><Footer /></>
    },
    {
      path: "/hostel_success",
      element: <><Navbar /><PaymentSuccesshf /><Footer /></>
    },
    {
      path: "/hostel_cancel",
      element: <><Navbar /><PaymentCancelhf /><Footer /></>
    },

    {
      path: "*",
      element: <NoPage />
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
