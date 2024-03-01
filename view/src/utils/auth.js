import axios from "axios";

export const signup = async (signupData) => {
  const { data } = await axios.post('http://localhost:8000/auth/signup', signupData);

  return data;
};

export const login = async (loginData) => {
  const { data } = await axios.post('http://localhost:8000/auth/login', loginData);

  return data;
};

export const googleSignIn = async () => {
  const {data} = await axios.get('http://localhost:8000/auth/google', {
    withCredentials: true,
  });

  return data.redirectUri;
};

export const logout = async () => {
  const { data } = await axios.post('http://localhost:8000/auth/logout');

  return data;
};