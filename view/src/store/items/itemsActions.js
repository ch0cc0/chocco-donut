import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItemsAPI } from '../../utils/items';

export const getItems = createAsyncThunk('items/fetchAll', async () => {
    return getItemsAPI();
});