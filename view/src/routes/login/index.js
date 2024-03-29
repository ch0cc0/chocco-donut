import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser } from "../../store/auth/authActions";
import GoogleSignUp from "../googleSignUp";
import validator from 'validator';

import {
  Avatar,
  Button,
  Container,
  CssBaseline,
  FormControlLabel,
  Grid,
  Link,
  TextField,
  Typography
} from "@mui/material";
import Checkbox from "@mui/material/Checkbox";
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';


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
    <Container component="main" maxWidth="xs">
      <CssBaseline />
      <div
        style={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Avatar sx={{ m: 1, bgcolor: '#e58300' }}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography component="h1" variant="h5">
          Log in
        </Typography>
        <form onSubmit={handleSubmit} style={{ width: '100%', marginTop: 1 }}>
          <TextField
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            autoComplete="username"
            autoFocus
            value={username}
            onChange={handleUsernameChange}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="password"
            label="Password"
            type="password"
            id="password"
            autoComplete="current-password"
            value={password}
            onChange={handlePasswordChange}
          />
          {auth.isLoading && <div>Loading...</div>}
          {auth.loginError && !auth.isLoading ? <div style={{ color: 'red' }}>Failed to Login! Error: {auth.loginError}</div> : null }
          <FormControlLabel
            control={<Checkbox value="remember" color="primary" />}
            label="Remember me"
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            color="primary"
            sx={{ mt: 3, mb: 2 }}
          >
            Log In
          </Button>
          <Grid container>
            <Grid item>
              <Link href="/auth/signup" variant="body2">
                {"Don't have an account? Sign Up"}
              </Link>
            </Grid>
          </Grid>
          <Grid container sx={{ mt: 3 }}>
            <Grid item>
              <GoogleSignUp />
            </Grid>
          </Grid>
        </form>
      </div>
    </Container>
  );

};

export default Login;