import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import logo from '../../Photos/dormify-logo.jpg';

const WardenNavbar = () => {
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggleDropdown = () => {
    setDropdownOpen(!dropdownOpen);
  };

  return (
    <nav className="bg-purple-700 p-4 flex justify-between items-center fixed top-0 left-0 right-0 z-10 shadow-lg w-full">
      {/* Logo and Name */}
      <NavLink to="/WardenDash" className="flex items-center space-x-3">
        <img src={logo} alt="Logo" className="w-10 h-auto" />
        <h1 className="text-white text-2xl font-serif">DORMIFY</h1>
      </NavLink>
      
      {/* Navbar Links */}
      <ul className="flex space-x-8">
        {/* Leaves Dropdown */}
        <li className="relative">
          <button
            onClick={toggleDropdown}
            className="text-white text-lg font-medium px-4 py-2 hover:text-gray-300"
          >
            Leaves
          </button>

          {dropdownOpen && (
            <div className="absolute left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48">
              <NavLink
                to="/LongLeavesApprove"
                className="block px-4 py-2 text-lg font-medium hover:bg-teal-100"
              >
                Long Leave
              </NavLink>
              <NavLink
                to="/leaves/late"
                className="block px-4 py-2 text-lg font-medium hover:bg-teal-100"
              >
                Late Leave
              </NavLink>
            </div>
          )}
        </li>

        {/* Complaints Link */}
        <NavLink 
          to="/complaintsviewwarden" 
          className={({ isActive }) => isActive ? "text-red-500" : "text-white hover:text-gray-300"}
        >
          <li className="px-4 py-2 text-lg font-medium">Complaints</li>
        </NavLink>

        <NavLink 
          to="/mess-schedule-warden"
          className={({ isActive }) => isActive ? "text-red-500" : "text-white hover:text-gray-300"}
        >
          <li className="px-4 py-2 text-lg font-medium">Mess Schedule</li>
        </NavLink>
      </ul>
    </nav>
  );
};

export default WardenNavbar;
