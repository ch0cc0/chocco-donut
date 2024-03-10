import { createSlice } from "@reduxjs/toolkit";
import { getCart, addToCart } from "./cartActions";

const initialState = {
    isLoading: false,
    data: [],
    error: null,
  };

const cartSlice = createSlice({
    name: 'cart',
    initialState,
    extraReducers: builder => {
        builder.addCase(getCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        })
        .addCase(getCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.data = [];
        })
        builder.addCase(addToCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(addToCart.fulfilled, (state) => {
            state.isLoading = false;
            state.error = null;
        })
        .addCase(addToCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
        })
    }
});

export default cartSlice.reducer;