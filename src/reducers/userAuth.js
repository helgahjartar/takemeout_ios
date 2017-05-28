import { CREATE_USER, LOGOUT, LOGIN } from '../actions/userAuthActions';
import { handleActions } from 'redux-actions';

const initialState = {};

export default handleActions({

  LOGOUT (state, action) {
    return Object.assign({}, state, {
      errorMessage: null,
      isAuthenticated: false,
      hasBeenSent: false
    });
  },

  [`${CREATE_USER}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: true,
      errorMessage: null
    });
  },

  [`${CREATE_USER}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      errorMessage: action.payload
    });
  },

  [`${CREATE_USER}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      errorMessage: null
    });
  },

  [`${LOGIN}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      errorMessage: null
    });
  },

  [`${LOGIN}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      errorMessage: "foo",
      isAuthenticated: false,
      hasBeenSent: true
    });
  },

  [`${LOGIN}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      isAuthenticated: true,
      hasBeenSent: true,
      errorMessage: null
    });
  }

}, initialState);
