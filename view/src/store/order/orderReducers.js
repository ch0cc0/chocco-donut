import { createSlice } from "@reduxjs/toolkit";
import { getOrderDetails } from "./orderActions";

const initialState = {
    isLoading: false,
    data: [],
    error: null,
    success: null,
  };

const orderSlice = createSlice({
    name: 'order',
    initialState,
    extraReducers: builder => {
        builder.addCase(getOrderDetails.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrderDetails.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
            state.success = true;
        })
        .addCase(getOrderDetails.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.data = [];
            state.success = false;
        })
    }
});

export default orderSlice.reducer;