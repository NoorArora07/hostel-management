import React, { useEffect, useState } from "react";
import { data, NavLink, useNavigate } from "react-router-dom";
import { Bell, CircleUserRoundIcon } from "lucide-react";
import dormify from "@/Photos/dormify-logo.jpg";
import Notifications from "@/Components/Notifications/Notifications";
import { getFromBackend, patchToBackend } from "@/store/fetchdata";

const Navbar = () => {

  //for notifications, ignore this and go down for navbar
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const navigate = useNavigate();

  const fetchNotifications = async () => {

    try {
      const response = await getFromBackend("http://127.0.0.1:5090/api/notif/view");
      setNotifications(response.data || []);
      // console.log("Notifications fetched successfully:", response.data);
      // console.log("Notifications in Navbar:", {notifications});
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);


  const handleNotificationClick = async (notifId) => {

    try {
      const data = {
      notifId : notifId,
      }
        // console.log("data:", data);
        // console.log(notifications)

        const markSeenResponse = await patchToBackend(
            `http://127.0.0.1:5090/api/notif/markSeen`, data
        ); 
        console.log("Mark Seen Response:", markSeenResponse);

        const deleteResponse = await patchToBackend(
            `http://127.0.0.1:5090/api/notif/delete`
        );
        // console.log("Delete Response:", deleteResponse);

        setNotifications((prev) =>
            prev.filter((notification) => notification._id !== notifId)
        );

        const notification = notifications.find((notif) => notif._id === notifId);
        console.log("Handling notification:", notification);

        switch (notification.field) {
          case 'complaint':
            navigate('/complaints');            
            break;
          case 'long_leave':
            navigate("/LongLeavesView");            
            break;
          case 'late_leave':
            navigate('/LateLeavesView');            
            break;
          case 'mess_event':
            navigate('/mess-schedule-view');            
            break;
        
          default:
            break;
        }
        toggleNotifications();
        console.log("Notification handled successfully");

    } catch (error) {
      console.error('Request Error:', error.toJSON ? error.toJSON() : error);
    }
};

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  //navbar starts here

  return (
    <nav className="bg-black fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLink to="/Homepage" className="flex items-center space-x-4">
            <div className="bg-white rounded-full p-3">
              <img
                src={dormify}
                alt="dormify"
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">
              DORMIFY
            </h1>
          </NavLink>
          <div className="flex items-center space-x-6">
            <ul className="hidden md:flex space-x-3">
              {[ 
                { path: "/hostelfee", label: "Hostel Fee"},
                { path: "/mess", label: "Mess"},
                { path: "/leaves", label: "Leaves" },
                { path: "/complaints", label: "Complaints" },
                { path: "/RoomsView", label: "Room Allocation" },
                {
                  path: "/profile",
                  label: (
                    <CircleUserRoundIcon 
                      className="w-10 h-10 rounded-full object-cover"
                    />
                  ),
                },
              ].map((item) => (
                <NavLink
                  key={item.path}
                  to={item.path}
                  className={({ isActive }) =>
                    `text-lg font-semibold px-4 py-3 rounded-lg transition-colors duration-150 ease-in-out ${
                      isActive
                        ? "bg-blue-700 text-white"
                        : "text-blue-100 hover:bg-blue-700 hover:text-white"
                    }`
                  }
                >
                  <li>{item.label}</li>
                </NavLink>
              ))}
            </ul>
            <div className="relative">
              <button
                onClick={toggleNotifications}
                className="p-3 rounded-full text-blue-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white"
                aria-label="View notifications"
              >
                <Bell className="h-7 w-7" />
              </button>
              {showNotifications && (
                <Notifications
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                  onNotificationClick={handleNotificationClick}
                />
              )}
            </div>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;