import { createSlice } from "@reduxjs/toolkit";
import { checkPurchaseSuccess } from "./stripeActions";

const initialState = {
    isLoading: false,
    error: null,
    successStatus: null,
  };

const stripeSlice = createSlice({
    name: 'stripe',
    initialState,
    extraReducers: builder => {
        builder.addCase(checkPurchaseSuccess.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(checkPurchaseSuccess.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.successStatus = action.payload.success;
        })
        .addCase(checkPurchaseSuccess.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.successStatus = false;
        })
    }
});

export default stripeSlice.reducer;