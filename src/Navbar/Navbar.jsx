import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom"; // Import Link and useLocation
// import { GiHamburgerMenu } from "react-icons/gi";
import Bootes from "/public/Assets/Bootes-Logo-caps_-Edited.jpeg";
import './Navbar.css';

const Navbar = () => {
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation(); // Get current location

  const handleMenuToggle = () => {
    setMenuOpen(!menuOpen);
  };

  const handleLinkClick = () => {
    setMenuOpen(false);
  };

  // Check if the current path is "/signup" or "/login"
  const isAuthPage = location.pathname === "/signup" || location.pathname === "/login";

  // Prevent navigation for disabled links
  const handleDisabledClick = (e) => {
    e.preventDefault(); // Prevent the default action
  };

  return (
    <>
      <header>
        {/* Logo Section */}
        <div className="logo">
          <Link to="/" onClick={handleLinkClick}>
            <img src={Bootes} alt="Logo" />
          </Link>
          <Link to="/" onClick={handleLinkClick}>
            <h1>Bootes Impex Tech Ltd</h1>
          </Link>
        </div>

        {/* Hamburger Menu Icon */}
        {/* {!isAuthPage && (
          <div className="hamburger" onClick={handleMenuToggle}>
            <GiHamburgerMenu />
          </div>
        )} */}

        {/* Navigation Links */}
        {!isAuthPage && (
          <nav className={`nav-menu ${menuOpen ? "open" : "close"}`}>
            <div className="nav-link">
              <Link 
                to="/home" 
                onClick={isAuthPage ? handleDisabledClick : handleLinkClick}
              >
                Home
              </Link>
            </div>
            {/* <div className="nav-link">
              <Link 
                to="/about" 
                onClick={isAuthPage ? handleDisabledClick : handleLinkClick}
              >
                About Us
              </Link>
            </div> */}
            <div className="nav-link">
              <Link 
                to="/projects" 
                onClick={isAuthPage ? handleDisabledClick : handleLinkClick}
              >
                Projects
              </Link>
            </div>
            {/* <div className="nav-link">
              <Link 
                to="/contact" 
                onClick={isAuthPage ? handleDisabledClick : handleLinkClick}
              >
                Contact Us
              </Link>
            </div> */}
          </nav>
        )}
      </header>
    </>
  );
};

export default Navbar;
