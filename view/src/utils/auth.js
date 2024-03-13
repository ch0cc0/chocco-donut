import axios from './axios-config';

export const isAuthenticatedAPI = async () => {
  const { data } = await axios.get('http://localhost:8000/auth/login');

  return data;
}

export const signupAPI = async (signupData) => {
  const { data } = await axios.post('http://localhost:8000/auth/signup', signupData);

  return data;
};

export const loginAPI = async (loginData) => {
  const { data } = await axios.post('http://localhost:8000/auth/login', loginData);

  return data;
};

export const googleSignInAPI = async () => {
  const {data} = await axios.get('http://localhost:8000/auth/google', {
    withCredentials: true,
  });

  return data.redirectUri;
};

export const logoutAPI = async () => {
  const { data } = await axios.post('http://localhost:8000/auth/logout');

  return data;
};