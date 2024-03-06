import { createSlice } from "@reduxjs/toolkit";
import { getItemById } from "./itemActions";

const initialState = {
    isLoading: false,
    data: {},
    error: null,
  };

const itemSlice = createSlice({
    name: 'item',
    initialState,
    extraReducers: builder => {
        builder.addCase(getItemById.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getItemById.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = [action.payload];
        })
        .addCase(getItemById.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.data = [];
        })
    }
});

export default itemSlice.reducer;