import { createAsyncThunk } from '@reduxjs/toolkit';
import { loginAPI, signupAPI, logoutAPI, isAuthenticatedAPI } from '../../utils/auth';

export const isAuthenticated = createAsyncThunk('auth/checkAuth', async () => {
    return isAuthenticatedAPI();
});

export const loginUser = createAsyncThunk('auth/login', async (loginData) => {
    return loginAPI(loginData);
});

export const signupUser = createAsyncThunk('auth/signup', async (signupData) => {
    return signupAPI(signupData);
});

export const logoutUser = createAsyncThunk('auth/logout', async () => {
    return logoutAPI();
});