import React, { useEffect, useState } from "react";
import { data, NavLink } from "react-router-dom";
import { Bell } from "lucide-react";
import dormify from "@/Photos/dormify-logo.jpg";
import Notifications from "@/Components/Notifications/Notifications";
import { getFromBackend, patchToBackend } from "@/store/fetchdata";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);

  // Fetch notifications from the backend
  const fetchNotifications = async () => {
    try {
      const response = await getFromBackend("http://127.0.0.1:5090/api/notif/view");
      setNotifications(response.data || []);
      console.log("Notifications fetched successfully:", response.data);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  // Fetch notifications on component mount
  useEffect(() => {
    fetchNotifications();
  }, []);

  // Handle notification click (mark as seen and delete)
  // const handleNotificationClick = async (seen, notifId) => {

  //   const data = {
  //     seen : true,
  //     notifId : notifId,
  //   }
  //   try {
  //     console.log("Clicked Notification ID:", notifId);

  //     // Mark notification as seen
  //     await patchToBackend(`http://127.0.0.1:5090/api/notif/markSeen/${notifId}`, data);

  //     // Delete notification
  //     await patchToBackend(`http://127.0.0.1:5090/api/notif/delete`, data);

  //     // Update the state by removing the notification
  //     setNotifications((prev) =>
  //       prev.filter((notification) => notification._id !== notifId)
  //     );

  //     console.log("Notification deleted successfully");
  //   } catch (error) {
  //     console.error("Error handling notification click:", error);
  //   }
  // };

  const handleNotificationClick = async (notifId) => {
    try {
        console.log("Clicked Notification ID:", notifId);

        // Mark notification as seen
        const markSeenResponse = await patchToBackend(
            `http://127.0.0.1:5090/api/notif/markSeen`,  { notifId }
        ); 
        console.log("Mark Seen Response:", markSeenResponse);

        // Delete notification if marked as seen
        const deleteResponse = await patchToBackend(
            `http://127.0.0.1:5090/api/notif/delete`
        );
        console.log("Delete Response:", deleteResponse);

        // Update the state
        setNotifications((prev) =>
            prev.filter((notification) => notification.id !== notifId)
        );
        console.log("Notification handled successfully");

    } catch (error) {
        console.error("Error handling notification click:", error.response || error);
    }
};

  

  // Toggle notification visibility
  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  return (
    <nav className="bg-gradient-to-r from-purple-600 via-black to-violet-800 fixed top-0 left-0 right-0 z-50 shadow-lg">
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
              {[ // Navigation menu
                { path: "/mess", label: "Mess" },
                { path: "/leaves", label: "Leaves" },
                { path: "/complaints", label: "Complaints" },
                { path: "/RoomsView", label: "Room Allocation" },
                { path: "/profile", label: "Profile" },
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
