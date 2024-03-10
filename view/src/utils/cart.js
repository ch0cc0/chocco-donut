import axios from "axios";

export const getCartAPI = async (userId) => {
const { data } = await axios.get(`http://localhost:8000/cart/${userId}`);

return data;
};

export const addToCartAPI = async (itemToAdd) => {
  const { data } = await axios.post(`http://localhost:8000/cart`, itemToAdd);

  return data;
};