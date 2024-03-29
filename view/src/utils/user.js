import axios from './axios-config';

export const updateUserAPI = async (userInfo) => {
const { data } = await axios.put(`http://localhost:8000/user`, userInfo);

return data;
};

export const getUserInfoAPI = async () => {
    const { data } = await axios.get(`http://localhost:8000/user`);
    
    return data;
    };