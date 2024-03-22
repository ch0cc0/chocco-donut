import { NavLink } from "react-router-dom";
import Logout from "../logout";
import { useSelector } from "react-redux";

const NavBar = () => {

  const auth = useSelector((state) => state.auth);

  return (
    <nav className="bg-black">
      <div>
        {/* Logo */}
        <NavLink to="/">
          Logo Here
        </NavLink>
        {/* Search Bar */}
        <input
          type="text"
          id="search-bar"
          placeholder="Search"
        />
      </div>
      <div>
        {/* Login NavLink */}
        {!auth.isAuthenticated && (
          <NavLink to="/auth/login" >
            Login
          </NavLink>
        )}
        {/* Sign Up NavLink */}
        {!auth.isAuthenticated && (
          <NavLink to="/auth/signup">
            Sign Up
          </NavLink>
        )}
        {/* Orders Button */}
        {(
          <NavLink
            to={`/products`}
          >
            Donuts
          </NavLink>
        )}
        {/* User Profile Button */}
        {auth.isAuthenticated && (
          <NavLink
            to={`/profile/${auth.userData.id}`}
          >
            Profile
          </NavLink>
        )}
        {/* Cart Button */}
        {auth.isAuthenticated && (
          <NavLink
            to={`/cart/${auth.userData.id}`}
          >
            Cart
          </NavLink>
        )}
        {/* Orders Button */}
        {auth.isAuthenticated && (
          <NavLink
            to={`/orders/${auth.userData.id}`}
          >
            Orders
          </NavLink>
        )}
        {/* Sign Out Button */}
        {auth.isAuthenticated && <Logout />}
      </div>
    </nav>
  );
};
  

export default NavBar;