import { useMutation, useQueryClient } from '@tanstack/react-query';
import React from 'react';
import GoogleSignIn  from 'react-google-button';
import { useNavigate } from 'react-router-dom';
import { googleSignIn } from "../../utils/auth";

const GoogleSignUp = () => {

    const navigate = useNavigate();
    const queryClient = useQueryClient();
  
    const mutation = useMutation({
      mutationFn: googleSignIn,
      onSuccess: () => {
          queryClient.invalidateQueries('myquerykey');
      },
      onError: (error) => {
          queryClient.invalidateQueries('myquerykey');
          console.log(error);
      }
    });

    const handleGoogleSignUp = async () => {
        console.log("Attempting to Sign In with Google");

        window.location.href = "https://accounts.google.com/o/oauth2/v2/auth?response_type=code&redirect_uri=http%3A%2F%2Flocalhost%3A8000%2Fauth%2Fgoogle%2Fcallback&scope=profile&client_id=976255676642-hkiisfeghqrlbos8e8kq9qj9fh11r2c2.apps.googleusercontent.com";
    };

    return (
        <GoogleSignIn onClick={handleGoogleSignUp} />
    );
};

export default GoogleSignUp;