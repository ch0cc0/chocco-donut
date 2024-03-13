import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrderDetailsAPI } from '../../utils/orders';

export const getOrderDetails = createAsyncThunk('orders/fetchById', async (userId, orderId) => {
    return getOrderDetailsAPI(userId, orderId);
});