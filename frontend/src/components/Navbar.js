import React from "react";
import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../assets/navbar.css";

const Navbar = () => {
  const { logout } = useAuth();

  return (
    <nav className="navbar">
      <h1>Video App</h1>
      <div>
        <Link to="/home">Home</Link>
        <Link to="/videos">View Videos</Link>
        <Link to="/upload">Upload Video</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </nav>
  );
};

export default Navbar;
