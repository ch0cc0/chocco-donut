import { createAsyncThunk } from '@reduxjs/toolkit';
import { checkPurchaseSuccessAPI } from '../../utils/stripe';

export const checkPurchaseSuccess = createAsyncThunk('stripe/fetchStatus', async () => {
    return checkPurchaseSuccessAPI();
});
