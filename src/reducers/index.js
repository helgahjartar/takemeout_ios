import { combineReducers } from 'redux';
import event from './event';
import userAuth from './userAuth';

function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    event: event,
    userAuth: userAuth
  });
}

export default getRootReducer;
