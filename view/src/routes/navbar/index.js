import { NavLink } from "react-router-dom";
import "./styling.css";
import Logout from "../logout";
import { useSelector } from "react-redux";

const NavBar = () => {

  const auth = useSelector((state) => state.auth);

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
          { auth.isAuthenticated ? null : 
          <NavLink to="/auth/login" className="navbar-link">
            Login
          </NavLink> 
          }
          { /* Sign Up NavLink */}
          { auth.isAuthenticated ? null :
          <NavLink to="/auth/signup" className="navbar-link">
            Sign Up
          </NavLink>
          }
          
          {/* Sign Out Button */}
          { auth.isAuthenticated ? <Logout /> : null }
        </div>
      </nav>
    );
  };
  

export default NavBar;