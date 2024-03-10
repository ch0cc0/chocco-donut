import axios from "axios";

export const checkoutAPI = async (userId) => {
  const { data } = await axios.post('http://localhost:8000/checkout', userId);

  return data;
};