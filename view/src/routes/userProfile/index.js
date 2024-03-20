import React, { useState } from "react";
import { useNavigate  } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
//import {  } from "../../store/user/userActions";


const UserProfile = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const auth = useSelector((state) => state.auth);
  //const user = useSelector((state) => state.user);

  const [firstname, setFirstName] = useState(auth.userData.firstname);
  const [lastname, setLastName] = useState(auth.userData.lastname);
  const [email, setEmail] = useState(auth.userData.email);

  const handleFirstNameChange = (e) => {
    setFirstName(e.target.value);
  };

  const handleLastNameChange = (e) => {
    setLastName(e.target.value);
  };

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
  };

  const userData = {
    firstname,
    lastname,
    email,
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    console.log(userData);

    //const result = await dispatch(updateUserInfo(userData));

  };

  return (
    <div>
      <h2>{auth.userData.username} Profile</h2>
      <form onSubmit={handleSubmit}>
        <div>
          <label htmlFor="firstname">First Name:</label>
          <input
            type="text"
            id="firstname"
            value={firstname}
            onChange={handleFirstNameChange}
            required
          />
        </div>
        <div>
          <label htmlFor="lastname">Last Name:</label>
          <input
            type="text"
            id="lastname"
            value={lastname}
            onChange={handleLastNameChange}
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
        <button type="submit">Modify Profile</button>
      </form>
    </div>
  );
};

export default UserProfile;
