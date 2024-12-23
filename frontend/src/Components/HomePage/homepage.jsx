import React from 'react';
import './Homepage.css';
import Navbar from '../Navbar/Navbar'; // Import the Navbar component

const Homepage = () => {
  return (
    <div className="homepage-container">
      <header className="homepage-header">
        <Navbar /> {/* Use the Navbar component */}
      </header>

      <main className="homepage-main">
        <section className="homepage-banner">
          <div className="homepage-description">
            <h1>Welcome to the Hostel Management System</h1>
            <p>
              Your one-stop solution for managing hostel activities such as leaves, mess schedules, complaints, and more.
            </p>
          </div>
          <div className="homepage-image-container">
          </div>
        </section>
      </main>

      <footer className="homepage-footer">
        <div>
          <p>&copy; 2024 Hostel Management System</p>
        </div>
        <div>
          <p>Contact Warden: warden@example.com</p>
        </div>
      </footer>
    </div>
  );
};

export default Homepage;