import { handleActions } from 'redux-actions';
import { CREATE_EVENT, CREATE_LOCATION, CREATE_PERFORMER } from '../actions/eventRegistrationActions';

const initialState = {
  isPending: false,
  success: false,
  hasBeenSent: false
};

export default handleActions({
  [`${CREATE_EVENT}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: true,
      success: false,
      hasBeenSent: false
    });
  },

  [`${CREATE_EVENT}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      success: false,
      hasBeenSent: true
    });
  },

  [`${CREATE_EVENT}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      success: true,
      hasBeenSent: true
    });
  },
  [`${CREATE_LOCATION}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: true,
      success: false,
      hasBeenSent: false
    });
  },

  [`${CREATE_LOCATION}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      success: false,
      hasBeenSent: true
    });
  },

  [`${CREATE_LOCATION}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      success: true,
      hasBeenSent: true
    });
    
  },[`${CREATE_PERFORMER}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: true,
      success: false,
      hasBeenSent: false
    });
  },

  [`${CREATE_PERFORMER}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      success: false,
      hasBeenSent: true
    });
  },

  [`${CREATE_PERFORMER}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      success: true,
      hasBeenSent: true
    });
  },

  FORM_CLEARED (state, action) {
    return initialState;
  }
}, initialState);
