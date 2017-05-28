import { combineReducers } from 'redux';
import eventQuery from './eventQuery';
import eventRegistration from './eventRegistration';
import userAuth from './userAuth';
import formSave from './formSave';

function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    event: combineReducers({
      query: eventQuery,
      registration: eventRegistration
    }),
    userAuth: userAuth,
    formSave: formSave
  });
}

export default getRootReducer;
