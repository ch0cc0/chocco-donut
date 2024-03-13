import { createSlice } from "@reduxjs/toolkit";
import { getOrders, createOrder } from "./ordersActions";

const initialState = {
    isLoading: false,
    data: [],
    error: null,
    success: null,
  };

const ordersSlice = createSlice({
    name: 'orders',
    initialState,
    extraReducers: builder => {
        builder.addCase(getOrders.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getOrders.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
            state.success = true;
        })
        .addCase(getOrders.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.data = [];
            state.success = false;
        })
        builder.addCase(createOrder.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(createOrder.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
            state.success = true;
        })
        .addCase(createOrder.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.success = false;
        })
    }
});

export default ordersSlice.reducer;