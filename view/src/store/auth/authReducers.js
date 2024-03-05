import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, logoutUser } from "./authActions";

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    loginError: null,
    signupError: null,
    userData: {}
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.loginError = null;
            state.userData = action.payload;
        })
        .addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.loginError = action.error.message;
            state.userData = {};
        })
        builder.addCase(signupUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.signupError = null;
            state.userData = action.payload;
        })
        .addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.signupError = action.error.message;
            state.userData = {};
        })
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(logoutUser.fulfilled, () => {
            return initialState;
        })
        .addCase(logoutUser.rejected, (state) => {
            state.isLoading = false;
            state.userData = {};
        })
    }
});

export default authSlice.reducer;