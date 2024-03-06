import { combineReducers } from 'redux';
import authReducer from './auth/authReducers';
import itemsReducer from './items/itemsReducers';
import itemReducer from './items/itemReducers';

export default combineReducers({
  auth: authReducer,
  items: itemsReducer,
  item: itemReducer,
});