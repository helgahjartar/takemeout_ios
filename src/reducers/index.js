import { combineReducers } from 'redux';
import event from './event';
import userAuth from './userAuth';
import formSave from './formSave';

function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    event: event,
    userAuth: userAuth,
    formSave: formSave
  });
}

export default getRootReducer;
