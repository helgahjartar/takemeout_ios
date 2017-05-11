import { combineReducers } from 'redux';
import registration from './registration';
import userAuth from './userAuth';

function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    registration: registration,
    userAuth: userAuth
  });
}

export default getRootReducer;
