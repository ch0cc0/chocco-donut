import axios from './axios-config';

export const getItemsAPI = async () => {
  const { data } = await axios.get('http://localhost:8000/items');

  return data;
};

export const getItemByIdAPI = async (id) => {
    const { data } = await axios.get(`http://localhost:8000/items/${id}`);
  
    return data;
  };