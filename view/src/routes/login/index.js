import React, { useState } from "react";
import { login } from "../../utils/auth";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import GoogleSignUp from "../googleSignUp";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const loginData = {
    username,
    password,
  };

  const mutation = useMutation({
    mutationFn: login,
    onSuccess: (data) => {
        queryClient.invalidateQueries('myquerykey');
        console.log(`Logged in as ${data.username}`);
        console.log(data)
        navigate('/');
    },
    onError: (error) => {
        queryClient.invalidateQueries('myquerykey');
        console.log(error);
        navigate('/auth/login');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(`Attempting to Log in as ${loginData.username}`);
    
    try {
      await mutation.mutateAsync(loginData);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div>
        <div>
          <h2>Log In</h2>
          <form onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username">Username:</label>
              <input
                type="text"
                id="username"
                autoComplete="username"
                value={username}
                onChange={handleUsernameChange}
              />
            </div>
            <div>
              <label htmlFor="password">Password:</label>
              <input
                type="password"
                id="password"
                autoComplete="current-password"
                value={password}
                onChange={handlePasswordChange}
              />
            </div>
            {mutation.isPending && <div>Loading...</div>}
            {mutation.error && <div style={{ color: 'red' }}>Failed to login</div>}
            <button type="submit">Log In</button>
          </form>
      </div>
      <h3>Or</h3>
      <div>
        <GoogleSignUp />
      </div>
    </div>

  );
};

export default Login;