import { createSlice } from "@reduxjs/toolkit";
import { getItemById, getItems } from "./itemsActions";

const initialState = {
    isLoading: false,
    data: [],
    error: null,
  };

const itemsSlice = createSlice({
    name: 'items',
    initialState,
    extraReducers: builder => {
        builder.addCase(getItems.pending, (state) => {
            state.isLoading = true;
        })
        .addCase(getItems.fulfilled, (state, action) => {
            state.isLoading = false;
            state.error = null;
            state.data = action.payload;
        })
        .addCase(getItems.rejected, (state, action) => {
            state.isLoading = false;
            state.error = action.error.message;
            state.data = [];
        })
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

export default itemsSlice.reducer;