import { combineReducers } from 'redux';
import eventQuery from './eventQuery';
import eventRegistration from './eventRegistration';
import userAuth from './userAuth';

function getRootReducer(navReducer) {
  return combineReducers({
    nav: navReducer,
    event: combineReducers({
      query: eventQuery,
      registration: eventRegistration
    }),
    userAuth: userAuth
  });
}

export default getRootReducer;
