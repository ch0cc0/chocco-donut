import React, { useState } from "react";
import { login } from "../../utils";
import { useNavigate } from "react-router-dom";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Login = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");

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
    onSuccess: () => {
        queryClient.invalidateQueries('myquerykey');
        console.log(`Logged in as`);
        navigate('/');
    },
    onError: (error) => {
        queryClient.invalidateQueries('myquerykey');
        console.log(error);
        setError(error);
        navigate('/login');
    }
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(loginData.username);
    
    try {
      const data = await mutation.mutateAsync(loginData);
    } catch (error) {
      console.log(error);
    }
    
  };

  return (
    <div>
      <h2>Log In</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="username">Username:</label>
          <input
            type="text"
            id="username"
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        {mutation.isPending && <div>Loading...</div>}
        {mutation.error && <div style={{ color: 'red' }}>Failed to login</div>}
        <button type="submit">Log In</button>
      </form>
    </div>
  );
};

export default Login;
