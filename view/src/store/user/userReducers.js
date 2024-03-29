import { createSlice } from "@reduxjs/toolkit";
import { updateUser, getUserInfo } from "./userActions";

const initialState = {
    isLoading: false,
    success: null,
    error: null,
    data: {}
  };

const userSlice = createSlice({
    name: 'user',
    initialState,
    extraReducers: builder => {
        builder.addCase(updateUser.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(updateUser.fulfilled, (state) => {
            state.isLoading = false;
            state.success = true;
            state.error = false;
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.isLoading = false;
            state.success = false;
            state.error = action.error.message;
        })
        builder.addCase(getUserInfo.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getUserInfo.fulfilled, (state, action) => {
            state.isLoading = false;
            state.success = true;
            state.error = false;
            state.data = action.payload;
        })
        .addCase(getUserInfo.rejected, (state, action) => {
            state.isLoading = false;
            state.success = false;
            state.error = action.error.message;
        })
    }
});

export default userSlice.reducer;