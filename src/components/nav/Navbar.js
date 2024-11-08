import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./styles.css";
// import "./script";
function Navbar() {
  const [navbarOpen, setNavbarOpen] = useState(false);

  const toggleNavbar = () => {
    setNavbarOpen(!navbarOpen);
  };
  return (
    <nav className="navbar">
      {/* <div className="navbar-logo">
        <a href="#">Website Logo</a>
      </div> */}
      <div className="navbar-toggle" onClick={toggleNavbar}>
        <i className="fa fa-bars">@</i>
      </div>
      <div
        className="navbar-items"
        style={{
          transform: navbarOpen ? "translateX(0)" : "translateX(-100%)",
        }}
      >
        <ul>
          <li>
            <Link to="/index">Home</Link>
          </li>
          <li>
            <Link to="/gallerys">Gallerys</Link>
          </li>
          <li>
            <Link to="/explore">Explore</Link>
          </li>
          <li>
            <Link to="/login">Login</Link>
          </li>
          <li>
            <Link to={"/dashboard"}>Dashboard</Link>
          </li>
        </ul>
      </div>
    </nav>
  );
}

export default Navbar;
