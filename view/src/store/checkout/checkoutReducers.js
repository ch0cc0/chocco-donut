import { createSlice } from "@reduxjs/toolkit";
import { checkoutCart } from "./checkoutActions";

const initialState = {
    isLoading: false,
    url: null,
    error: null,
    success: null,
  };

const checkoutSlice = createSlice({
    name: 'checkout',
    initialState,
    extraReducers: builder => {
        builder.addCase(checkoutCart.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(checkoutCart.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.success = true;
            state.url = action.payload;
        })
        .addCase(checkoutCart.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.success = false;
            state.url = null;
        })
    }
});

export default checkoutSlice.reducer;