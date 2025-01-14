import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import { User, LogOut } from 'lucide-react';
import { Button } from "@/Components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/Components/ui/dropdown-menu"
import logo from '../../Photos/dormify-logo.jpg';
import { useNavigate } from 'react-router-dom';

const WardenNavbar = () => {
  const [leavesDropdownOpen, setLeavesDropdownOpen] = useState(false); // For leaves dropdown
  const dropdownRef = useRef(null);
  const navigate = useNavigate();

  // Toggles the leaves dropdown
  const toggleLeavesDropdown = () => {
    setLeavesDropdownOpen(!leavesDropdownOpen);
  };

  const handleLogout = () => {
    // Add any necessary logout logic here if needed
    navigate('/'); // Redirect to the home page or login page.
  };

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setLeavesDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  return (
    <nav className="bg-black fixed top-0 left-0 right-0 z-50 shadow-md shadow-purple-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo and Name */}
          <NavLink to="/WardenDash" className="flex items-center space-x-4">
            <div className="rounded-full p-2">
              <img
                src={logo}
                alt="Dormify Logo"
                className="w-12 h-12 object-cover rounded-full"
              />
            </div>
            <h1 className="text-3xl font-bold text-white tracking-tight">DORMIFY</h1>
          </NavLink>

          <div className="flex items-center space-x-6">
            {/* Navbar Links */}
            <ul className="hidden md:flex items-center space-x-4">
              {/* Leaves Dropdown */}
              <li className="relative" ref={dropdownRef}>
                <button
                  onClick={toggleLeavesDropdown}
                  className="text-base font-semibold px-3 py-2 rounded-lg transition-colors duration-150 ease-in-out text-blue-100 hover:bg-violet-500 hover:text-white"
                >
                  Leaves
                </button>
                {leavesDropdownOpen && (
                  <div className="absolute left-0 mt-2 bg-white text-gray-800 rounded-lg shadow-lg w-48 z-50">
                    <NavLink
                      to="/LongLeavesApprove"
                      className="block px-4 py-2 text-sm font-medium hover:bg-violet-100"
                    >
                      Long Leave
                    </NavLink>
                    <NavLink
                      to="/LateLeavesApprove"
                      className="block px-4 py-2 text-sm font-medium hover:bg-violet-100"
                    >
                      Late Leave
                    </NavLink>
                  </div>
                )}
              </li>

              {/* Complaints Link */}
              <NavLink
                to="/complaintsviewwarden"
                className={({ isActive }) =>
                  `text-base font-semibold px-3 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                    isActive
                      ? 'bg-violet-700 text-white'
                      : 'text-blue-100 hover:bg-violet-500 hover:text-white'
                  }`
                }
              >
                Complaints
              </NavLink>

              {/* Mess Schedule Link */}
              <NavLink
                to="/mess-schedule-warden"
                className={({ isActive }) =>
                  `text-base font-semibold px-3 py-2 rounded-lg transition-colors duration-150 ease-in-out ${
                    isActive
                      ? 'bg-violet-700 text-white'
                      : 'text-blue-100 hover:bg-violet-500 hover:text-white'
                  }`
                }
              >
                Mess Schedule
              </NavLink>
            </ul>

            {/* Profile Icon with Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="ghost"
                  size="lg"
                  className="text-black bg-purple-200 hover:bg-purple-800 hover:text-white transition-colors duration-200"
                >
                  <User className="h-6 w-6" />
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent className="w-56" align="end" forceMount>
                <DropdownMenuLabel className="font-normal">
                  <div className="flex flex-col space-y-1">
                    <p className="text-sm font-medium leading-none">Warden</p>
                    <p className="text-xs leading-none text-muted-foreground">
                      warden@dormify.com
                    </p>
                  </div>
                </DropdownMenuLabel>
                <DropdownMenuSeparator />
                <DropdownMenuItem onClick={handleLogout}>
                  <LogOut className="mr-2 h-4 w-4" />
                  <span>Log out</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>
    </nav>
  );
};

export default WardenNavbar;