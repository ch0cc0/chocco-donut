import { combineReducers } from 'redux';
import authReducer from './auth/authReducers';
//import itemReducer from './item/itemReducers';

export default combineReducers({
  auth: authReducer,
  //item: itemReducer,
});