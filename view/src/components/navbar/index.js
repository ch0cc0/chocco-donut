import { NavLink } from "react-router-dom";
import "./styling.css";
import Logout from "../logout";

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
            id="search-bar"
            placeholder="Search"
            className="navbar-search"
          />
        </div>
        <div className="navbar-right">
          {/* Login NavLink */}
          <NavLink to="/auth/login" className="navbar-link">
            Login
          </NavLink>
          {/* Sign Up NavLink */}
          <NavLink to="/auth/signup" className="navbar-link">
            Sign Up
          </NavLink>
          {/* Sign Out Button */}
          <Logout />
        </div>
      </nav>
    );
  };
  

export default NavBar;