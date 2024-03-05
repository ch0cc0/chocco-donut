import axios from "axios";

export const getItemsAPI = async () => {
  const { data } = await axios.get('http://localhost:8000/items');

  return data;
};