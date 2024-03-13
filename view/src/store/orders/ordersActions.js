import { createAsyncThunk } from '@reduxjs/toolkit';
import { getOrdersAPI, createOrderAPI } from '../../utils/orders';

export const getOrders = createAsyncThunk('orders/fetchAll', async (userId) => {
    return getOrdersAPI(userId);
});

export const createOrder = createAsyncThunk('orders/create', async (userId) => {
    return createOrderAPI(userId);
});

