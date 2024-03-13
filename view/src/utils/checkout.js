import axios from './axios-config';

export const checkoutAPI = async (userId) => {
  const { data } = await axios.post('http://localhost:8000/checkout', userId);

  return data;
};