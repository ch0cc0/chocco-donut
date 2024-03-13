import axios from './axios-config';

export const checkPurchaseSuccessAPI = async () => {
  const { data } = await axios.get(`http://localhost:8000/verify-payment`);

  return data;
};