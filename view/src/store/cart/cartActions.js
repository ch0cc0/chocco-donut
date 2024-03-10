import { createAsyncThunk } from '@reduxjs/toolkit';
import { addToCartAPI, getCartAPI } from '../../utils/cart';

export const getCart = createAsyncThunk('cart/fetchCart', async (userId) => {
    return getCartAPI(userId);
});

export const addToCart = createAsyncThunk('cart/addToCart', async (itemToAdd) => {
    return addToCartAPI(itemToAdd);
});