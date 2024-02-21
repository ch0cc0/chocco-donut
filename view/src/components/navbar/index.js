import { NavLink } from "react-router-dom";
import "./styling.css";

const NavBar = () => {
    return (
      <nav className="navbar">
        <div className="navbar-left">
          {/* Logo */}
          <NavLink to="/" className="navbar-logo">
            Logo Here
          </NavLink>
          {/* Search Bar */}
          <input
            type="text"
            placeholder="Search"
            className="navbar-search"
          />
        </div>
        <div className="navbar-right">
          {/* Login NavLink */}
          <NavLink to="/login" className="navbar-link">
            Login
          </NavLink>
          {/* Sign Up NavLink */}
          <NavLink to="/signup" className="navbar-link">
            Sign Up
          </NavLink>
        </div>
      </nav>
    );
  };
  

export default NavBar;