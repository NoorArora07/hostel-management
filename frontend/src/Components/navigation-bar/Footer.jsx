import React from 'react';

const Footer = () => {
  return (
    <div className='mb-0 mt-10'>
    <footer className="w-screen bg-gray-800 text-white py-4 absolute left-0 ">
      <div className="container mx-auto grid grid-cols-2 items-center max-w-7xl px-4">
        <div className="text-center sm:text-left">
          <p className="text-sm">&copy; 2024 Hostel Management System</p>
        </div>
        <div className="text-center sm:text-right">
          <p className="text-sm">
            Contact Warden: warden@example.com
          </p>
        </div>
      </div>
    </footer>
    </div>
  );
};

export default Footer;
