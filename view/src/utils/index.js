import axios from "axios";

export const signup = async (signupData) => {
  const { data } = await axios.post('http://localhost:8000/signup', signupData);

  return data;
};

export const login = async (loginData) => {
  const { data } = await axios.post('http://localhost:8000/login', loginData);

  return data;
};