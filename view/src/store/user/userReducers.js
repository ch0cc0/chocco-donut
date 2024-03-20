import { createSlice } from "@reduxjs/toolkit";
import {  } from "./userActions";

const initialState = {
    isLoading: false,
    isAuthenticated: false,
    loginError: null,
    signupError: null,
    userData: {}
  };

const userSlice = createSlice({
    name: 'user',
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
    }
});

export default userSlice.reducer;