import { combineReducers } from 'redux';
import authReducer from './auth/authReducers';
import itemsReducer from './item/itemsReducers';

export default combineReducers({
  auth: authReducer,
  item: itemsReducer,
});