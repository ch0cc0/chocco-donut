import axios from './axios-config';

export const getOrdersAPI = async (userId) => {
  const { data } = await axios.get(`http://localhost:8000/orders/${userId}/`);

  return data;
};

export const createOrderAPI = async (userId) => {
    const { data } = await axios.post(`http://localhost:8000/orders/`, userId);
  
    return data;
};

export const getOrderDetailsAPI = async (userId, orderId) => {
    const { data } = await axios.get(`http://localhost:8000/orders/${userId}/${orderId}`);
  
    return data;
};