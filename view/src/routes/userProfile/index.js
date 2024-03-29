import React, { useEffect, useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Typography, TextField, Button, Container } from "@mui/material";
import { getUserInfo, updateUser } from "../../store/user/userActions";
import validator from 'validator';

const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  const user = useSelector((state) => state.user);

  const [firstname, setFirstName] = useState(user.data.firstname);
  const [lastname, setLastName] = useState(user.data.lastname);
  const [email, setEmail] = useState(user.data.email);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  useEffect(() => {
    if (!auth.isAuthenticated) {
      navigate('/auth/login');
    } else {
      const getInfo = async () => {
        await dispatch(getUserInfo());
      };
      getInfo();
    }
    
  }, [auth.isAuthenticated, navigate]);
  

  const handleSubmit = async (e) => {
    e.preventDefault();

    const sanitizedFirstName = validator.escape(validator.trim(firstname));
    const sanitizedLastName = validator.escape(validator.trim(lastname));
    const sanitizedEmail = validator.escape(validator.trim(email));

    const userData = {
      userId: auth.userData.id,
      firstName: sanitizedFirstName,
      lastName: sanitizedLastName,
      email: sanitizedEmail
    };

    console.log('Updating user profile');

    await dispatch(updateUser(userData));

    await dispatch(getUserInfo());

  };

  return (
    <Container sx={{ p: 2 }}>
      <Typography variant="h2">{auth.userData.username} Profile</Typography>
      <form onSubmit={handleSubmit} sx={{ mt: 2 }}>
        <div>
          <Typography htmlFor="firstname" variant="subtitle1">
            First Name:
          </Typography>
          <TextField
            type="text"
            id="firstname"
            value={firstname}
            onChange={handleFirstNameChange}
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 1 }}
          />
        </div>
        <div>
          <Typography htmlFor="lastname" variant="subtitle1">
            Last Name:
          </Typography>
          <TextField
            type="text"
            id="lastname"
            value={lastname}
            onChange={handleLastNameChange}
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 1 }}
          />
        </div>
        <div>
          <Typography htmlFor="email" variant="subtitle1">
            Email:
          </Typography>
          <TextField
            type="email"
            id="email"
            value={email}
            onChange={handleEmailChange}
            variant="outlined"
            fullWidth
            required
            sx={{ mt: 1 }}
          />
        </div>
        {user.isLoading && <Typography>Loading...</Typography>}
        {user.error && !user.isLoading && (
          <Typography sx={{ color: 'red' }}>Error: {user.error} Try to Refresh</Typography>
        )}
        <Button type="submit" variant="contained" sx={{ mt: 2 }}>
          Modify Profile
        </Button>
      </form>
    </Container>
  );
};

export default UserProfile;
