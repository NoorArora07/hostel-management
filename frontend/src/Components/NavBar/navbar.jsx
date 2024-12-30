import React from 'react';
import './navbar.css';
import logo from '../../Photos/dormify-logo.jpg';
import { NavLink } from 'react-router-dom';

const Navbar = () => {
  return (
    <nav className="homepage-navbar">
      <NavLink to="/Homepage" className="logo-name">
        <img src={logo} alt="Logo" />
        <h1>DORMIFY</h1>
      </NavLink>
      <ul>
        <NavLink className={({ isActive }) => isActive ? "red" : ""} to="/mess"><li>Mess</li></NavLink>
        <NavLink className={({ isActive }) => isActive ? "red" : ""} to="/leaves"><li>Leaves</li></NavLink>
        <NavLink className={({ isActive }) => isActive ? "red" : ""} to="/complaints"><li>Complaints</li></NavLink>
        <NavLink className={({ isActive }) => isActive ? "red" : ""} to="/RoomsView"><li>Room Allocation</li></NavLink>
        <NavLink className={({ isActive }) => isActive ? "red" : ""} to="/profile"><li>Profile Page</li></NavLink>
      </ul>
    </nav>
  );
};

export default Navbar;
