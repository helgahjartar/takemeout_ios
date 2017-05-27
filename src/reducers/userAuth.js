import { LOGIN_SUCCESS, LOGIN_ERROR, REGISTRATION_ERROR, LOGOUT, LOGIN } from '../actions/userAuthActions';
import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({

  LOGIN_SUCCESS (state, action) {
    return Object.assign({}, state, {
      isAuthenticated: true,
      hasBeenSent: true,
      errorMessage: ''
    });
  },

  LOGIN_ERROR (state, action) {
    return Object.assign({}, state, {
      errorMessage: 'User unauthenticated',
      isAuthenticated: false,
      hasBeenSent: true
    });
  },

  LOGOUT (state, action) {
    return Object.assign({}, state, {
      errorMessage: null,
      isAuthenticated: false,
      hasBeenSent: false
    });
  },

  REGISTRATION_ERROR (state, action) {
    return Object.assign({}, state, {
      errorMessage: action.errorMessage,
      registrationError: true
    });
  },

  [`${LOGIN}_PENDING`]: (state, action) => ({
    isAuthenticated: false,
    hasBeenSent: false,
    errorMessage: ''
  }),

  [`${LOGIN}_REJECTED`]: (state, action) => ({
    errorMessage: 'User unauthenticated',
    isAuthenticated: false,
    hasBeenSent: true
  }),

  [`${LOGIN}_FULFILLED`]: (state, action) => ({
    isAuthenticated: true,
    hasBeenSent: true,
    errorMessage: ''
  })

}, initialState);
