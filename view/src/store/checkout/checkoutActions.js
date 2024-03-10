import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkoutAPI } from '../../utils/checkout';

export const checkoutCart = createAsyncThunk('checkout/checkoutCart', async (userId) => {
    return checkoutAPI(userId);
});