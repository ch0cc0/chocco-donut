import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, signupAPI, logoutAPI } from '../../utils/auth';

export const loginUser = createAsyncThunk('auth/login', async (loginData) => {
    return loginAPI(loginData);
});

export const signupUser = createAsyncThunk('auth/login', async (signupData) => {
    return signupAPI(signupData);
});

export const logoutUser = createAsyncThunk('auth/login', async () => {
    return logoutAPI();
});