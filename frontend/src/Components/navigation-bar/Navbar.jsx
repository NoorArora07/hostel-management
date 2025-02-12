import React, { useEffect, useState, useRef } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Bell, CircleUserRoundIcon } from "lucide-react";
import dormify from "@/Photos/dormify-logo.jpg";
import Notifications from "@/Components/Notifications/Notifications";
import { getFromBackend, patchToBackend } from "@/store/fetchdata";
import { baseUrl } from "@/urls";

const Navbar = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const [showPopup, setShowPopup] = useState(false); // State for popup
  const navigate = useNavigate();
  const notificationsRef = useRef(null);

  const fetchNotifications = async () => {
    try {
      const response = await getFromBackend(`${baseUrl}/api/notif/view`);
      setNotifications(response.data || []);
    } catch (error) {
      console.error("Error fetching notifications:", error);
    }
  };

  useEffect(() => {
    fetchNotifications();
  }, []);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        notificationsRef.current &&
        !notificationsRef.current.contains(event.target)
      ) {
        setShowNotifications(false);
      }
    };

    if (showNotifications) {
      document.addEventListener("click", handleClickOutside);
    } else {
      document.removeEventListener("click", handleClickOutside);
    }

    return () => {
      document.removeEventListener("click", handleClickOutside);
    };
  }, [showNotifications]);

  const handleNotificationClick = async (notifId) => {
    try {
      const notification = notifications.find((notif) => notif._id === notifId);
      if (!notification) return;

      await patchToBackend(`${baseUrl}/api/notif/markSeen`, {
        notifId,
      });
      await patchToBackend(`${baseUrl}/api/notif/delete`, {
        notifId,
      });

      setNotifications((prev) =>
        prev.filter((notification) => notification._id !== notifId)
      );

      switch (notification.field) {
        case "complaint":
          navigate("/complaints");
          break;
        case "long_leave":
          navigate("/LongLeavesView");
          break;
        case "late_leave":
          navigate("/LateLeavesView");
          break;
        case "mess_event":
          navigate("/mess-schedule-view");
          break;
        case "mess_payDetails":
          navigate("/view-mess-fee");
          break;
        case "rooM":
          navigate("/RoomsView");
          break;
        default:
          break;
      }

      toggleNotifications();
    } catch (error) {
      console.error("Error handling notification:", error);
    }
  };

  const toggleNotifications = () => {
    setShowNotifications((prev) => !prev);
  };

  const checkRoomAllocationStatus = async () => {
    try {
      const response = await getFromBackend(`${baseUrl}/api/hostelFee/status`);
      const status = response.data.status;

      if (status === "paid") {
        navigate("/RoomsView");
      } else {
        setShowPopup(true);
      }
    } catch (error) {
      console.error("Error checking room allocation status:", error);
    }
  };

  const handlePopupClose = () => {
    setShowPopup(false);
  };

  return (
    <nav className="bg-black fixed top-0 left-0 right-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          <NavLink to="/Homepage" className="flex items-center space-x-4">
            <div className="rounded-full p-2">
              <img
                src={dormify}
                alt="dormify"
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">DORMIFY</h1>
          </NavLink>
          <div className="flex items-center space-x-6">
            <ul className="hidden md:flex items-center space-x-4">
              {[
                { path: "/hostel-fee", label: "Hostel Fee" },
                { path: "/mess", label: "Mess" },
                { path: "/leaves", label: "Leaves" },
                { path: "/complaints", label: "Complaints" },
              ].map((item) => (
                <li key={item.label}>
                  <NavLink
                    to={item.path}
                    className={({ isActive }) =>
                      `text-base font-semibold px-3 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                        isActive
                          ? "bg-violet-700 text-white"
                          : "text-blue-100 hover:bg-violet-500 hover:text-white"
                      }`
                    }
                  >
                    {item.label}
                  </NavLink>
                </li>
              ))}
              <li>
                <button
                  onClick={checkRoomAllocationStatus}
                  className="text-base font-semibold px-3 py-2 rounded-lg text-blue-100 hover:bg-violet-500 hover:text-white transition-colors duration-150 ease-in-out"
                >
                  Room Allocation
                </button>
              </li>
            </ul>

            {/* Notifications Icon */}
            <div className="relative" ref={notificationsRef}>
              <button
                onClick={toggleNotifications}
                className="p-2 rounded-full text-blue-100 hover:text-white focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-blue-800 focus:ring-white relative"
                aria-label="View notifications"
              >
                <Bell className="h-6 w-6" />
                {notifications.length > 0 && (
                  <span className="absolute -top-1 -right-1 inline-flex items-center justify-center h-5 w-5 text-xs font-bold text-white bg-red-600 rounded-full">
                    {notifications.length}
                  </span>
                )}
              </button>
              {showNotifications && (
                <Notifications
                  notifications={notifications}
                  onClose={() => setShowNotifications(false)}
                  onNotificationClick={handleNotificationClick}
                />
              )}
            </div>

            {/* Profile Icon */}
            <NavLink
              to="/profile"
              className={({ isActive }) =>
                `text-base font-semibold px-3 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                  isActive
                    ? "bg-violet-700 text-white"
                    : "text-blue-100 hover:bg-violet-500 hover:text-white"
                }`
              }
            >
              <CircleUserRoundIcon className="w-8 h-8" />
            </NavLink>
          </div>
        </div>
      </div>

      {/* Popup */}
      {showPopup && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
          <div className="bg-white p-6 rounded-lg shadow-lg">
            <h2 className="text-lg font-bold mb-4">Hostel Fee Pending</h2>
            <p className="mb-4">
              You need to pay the hostel fee before accessing room allocation.
            </p>
            <div className="flex justify-end space-x-4">
              <button
                className="px-4 py-2 bg-gray-200 rounded-lg"
                onClick={handlePopupClose}
              >
                Close
              </button>
              <button
                className="px-4 py-2 bg-violet-500 text-white rounded-lg"
                onClick={() => {
                  setShowPopup(false);
                  navigate("/hostel-fee");
                }}
              >
                Pay Hostel Fee
              </button>
            </div>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
