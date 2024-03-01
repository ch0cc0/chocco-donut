import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { signup } from "../../utils/auth";
import { useMutation, useQueryClient } from "@tanstack/react-query";

const Signup = () => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const signupData = {
    username,
    password,
    email,
  };

  const mutation = useMutation({
    mutationFn: signup,
    onSuccess: () => {
      queryClient.invalidateQueries('myquerykey');
      navigate('/auth/login');
    },
    onError: () => {
      queryClient.invalidateQueries('myquerykey');
      navigate('/auth/signup');
    },
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(signupData.username);

    await mutation.mutateAsync(signupData);
  };

  return (
    <div>
      <h2>Sign Up</h2>
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
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
          />
        </div>
        {mutation.isPending && <div>Loading...</div>}
        {mutation.error && <div style={{ color: 'red' }}>An error has occurred!</div>}
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
