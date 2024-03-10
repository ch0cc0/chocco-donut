import { combineReducers } from 'redux';
import authReducer from './auth/authReducers';
import itemsReducer from './items/itemsReducers';
import itemReducer from './item/itemReducers';
import cartReducer from './cart/cartReducers';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  item: itemReducer,
  cart: cartReducer,
});