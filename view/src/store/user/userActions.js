import { createAsyncThunk } from '@reduxjs/toolkit';
import { updateUserAPI, getUserInfoAPI } from '../../utils/user';

export const updateUser = createAsyncThunk('user/updateUser', async (userInfo) => {
    return updateUserAPI(userInfo);
});

export const getUserInfo = createAsyncThunk('user/getUser', async () => {
    return getUserInfoAPI();
});