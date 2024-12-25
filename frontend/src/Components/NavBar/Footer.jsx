import React from 'react';

const Footer = () => {
  return (
    <footer className="bg-dark-gray text-white py-4 mt-8 absolute bottom-0 left-0 w-full">
      <div className="container mx-auto flex justify-between items-center">
        <div className="flex flex-col items-center sm:items-start">
          <p>&copy; 2024 Hostel Management System</p>
        </div>
        <div className="flex flex-col items-center sm:items-end">
          <p className="text-gray-400">Contact Warden: warden@example.com</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
