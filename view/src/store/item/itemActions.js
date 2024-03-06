import { createAsyncThunk } from '@reduxjs/toolkit';
import { getItemByIdAPI } from '../../utils/items';

export const getItemById = createAsyncThunk('item/fetchById', async (id) => {
    return getItemByIdAPI(id);
});