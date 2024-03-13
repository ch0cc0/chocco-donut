import { combineReducers } from 'redux';
import authReducer from './auth/authReducers';
import itemsReducer from './items/itemsReducers';
import itemReducer from './item/itemReducers';
import cartReducer from './cart/cartReducers';
import checkoutReducer from './checkout/checkoutReducers';
import ordersReducer from './orders/ordersReducers';
import orderReducer from './order/orderReducers';
import stripeReducer from './stripe/stripeReducers';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  item: itemReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
  orders: ordersReducer,
  order: orderReducer,
  stripe: stripeReducer,
});