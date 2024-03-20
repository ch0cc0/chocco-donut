import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth/authActions";
import GoogleSignUp from "../googleSignUp";
import validator from 'validator';

const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  

  const auth = useSelector((state) => state.auth);

  useEffect(() => {
    if (auth.isAuthenticated) {
      navigate('/');
    }
  }, [auth.isAuthenticated]);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedUsername = validator.escape(validator.trim(username));
    const sanitizedPassword = validator.escape(validator.trim(password));

    const loginData = {
      username: sanitizedUsername,
      password: sanitizedPassword,
    };

    console.log(`Attempting to Log in as ${loginData.username}`);

    dispatch(loginUser(loginData));
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
                required
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
                required
              />
            </div>
            {auth.isLoading && <div>Loading...</div>}
            {auth.loginError && !auth.isLoading ? <div style={{ color: 'red' }}>Failed to Login! Error: {auth.loginError}</div> : null }
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