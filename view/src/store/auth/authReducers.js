import { createSlice } from "@reduxjs/toolkit";
import { loginUser, signupUser, logoutUser } from "./authActions";

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    error: null,
    userData: {}
  };

const authSlice = createSlice({
    name: 'auth',
    initialState,
    extraReducers: builder => {
        builder.addCase(loginUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(loginUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.error = null
            state.userData = action.payload
        })
        builder.addCase(loginUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.error.message
            state.userData = {}
        })
        builder.addCase(signupUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(signupUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = true;
            state.error = null
            state.userData = action.payload
        })
        builder.addCase(signupUser.rejected, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = action.error.message
            state.userData = {}
        })
        builder.addCase(logoutUser.pending, (state) => {
            state.isLoading = true;
        })
        builder.addCase(logoutUser.fulfilled, (state, action) => {
            state.isLoading = false;
            state.isAuthenticated = false;
            state.error = null
            state.userData = {}
        })
        builder.addCase(logoutUser.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message
            state.userData = {}
        })
    }
});

export default authSlice.reducer;