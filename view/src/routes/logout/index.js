import React from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { logoutUser } from "../../store/auth/authActions";

const Logout = () => {
    const navigate = useNavigate();
    const dispatch = useDispatch();
    
    const handleSignOut = async () => {
  
      console.log("Attempting to Log Out");

      const result = await dispatch(logoutUser());

      if (result.meta.requestStatus === "fulfilled") {
        navigate('/auth/login');
      }
    };

  return (
    <button className="navbar-link" onClick={handleSignOut}>
        Sign Out
    </button>
  );
};

export default Logout;
