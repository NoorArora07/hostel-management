import React from 'react';
import './Navbar.css';
import React from 'react';
import './Navbar.css';
import logo from '../../Photos/dormify-logo.jpg';

const Navbar = () => {
  return (
    <nav className="homepage-navbar">
      <div className="logo-name">
        <img src={logo} alt="Logo"/>
        <h1>DORMIFY</h1>
      </div>
      <ul>
        <li><a href="#mess">Mess</a></li>
        <li><a href="#leaves">Leaves</a></li>
        <li><a href="#complaints">Complaints</a></li>
        <li><a href="#profile">Profile</a></li>
      </ul>
    </nav>
  );
};

export default Navbar;