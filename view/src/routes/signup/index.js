import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser } from "../../store/auth/authActions";


const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);

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

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(signupData.username);

    const result = await dispatch(signupUser(signupData));

    if (result.meta.requestStatus === "fulfilled") {
      navigate('/auth/login');
    }
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
            required
          />
        </div>
        <div>
          <label htmlFor="password">Password:</label>
          <input
            type="password"
            id="password"
            value={password}
            onChange={handlePasswordChange}
            required
          />
        </div>
        <div>
          <label htmlFor="email">Email:</label>
          <input
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            required
          />
        </div>
        {auth.isLoading && <div>Loading...</div>}
        {auth.signupError && !auth.isLoading ? <div style={{ color: 'red' }}>Error: {auth.signupError}</div> : null }
        <button type="submit">Sign Up</button>
      </form>
    </div>
  );
};

export default Signup;
