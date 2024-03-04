import React from "react";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { logout } from "../../utils/auth";

const Logout = () => {
    const navigate = useNavigate();
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: logout,
      onSuccess: () => {
          queryClient.invalidateQueries('myquerykey');
          console.log(`Logged Out`);
          navigate('/');
      },
      onError: (error) => {
          queryClient.invalidateQueries('myquerykey');
          console.log(error);
      }
    });
  
    const handleSignOut = async () => {
  
      console.log("Attempting to Log Out");
      
      try {
        await mutation.mutateAsync();
      } catch (error) {
        console.log(error);
      }
    };

  return (
    <button className="navbar-link" onClick={handleSignOut}>
        Sign Out
    </button>
  );
};

export default Logout;
