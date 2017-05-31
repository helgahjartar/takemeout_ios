import { handleActions } from 'redux-actions';
import { CREATE_EVENT, CREATE_LOCATION, CREATE_PERFORMER, SAVE_EVENT_FORM, SAVE_PERFORMER_FORM, SAVE_LOCATION_FORM } from '../actions/eventRegistrationActions';

const initialState = {
  isPending: false,
  errorMsg: null,
  eventForm: null,
  locationForm: null,
  performerForm: null
};

export default handleActions({
  SAVE_EVENT_FORM (state, action) {
    return Object.assign({}, state, {
      eventForm: action.formData
    });
  },

  SAVE_PERFORMER_FORM (state, action) {
    return Object.assign({}, state, {
      performerForm: action.formData
    });
  },

  SAVE_LOCATION_FORM (state, action) {
    return Object.assign({}, state, {
      locationForm: action.formData
    });
  },

  [`${CREATE_EVENT}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: true,
      errorMsg: null
    });
  },

  [`${CREATE_EVENT}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      errorMsg: action.payload
    });
  },

  [`${CREATE_EVENT}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      errorMsg: null,
      eventForm: null
    });
  },

  [`${CREATE_LOCATION}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: true,
      errorMsg: null
    });
  },

  [`${CREATE_LOCATION}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      errorMsg: action.payload
    });
  },

  [`${CREATE_LOCATION}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      errorMsg: null,
      locationForm: null
    });

  },[`${CREATE_PERFORMER}_PENDING`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: true,
      errorMsg: null
    });
  },

  [`${CREATE_PERFORMER}_REJECTED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      errorMsg: action.payload
    });
  },

  [`${CREATE_PERFORMER}_FULFILLED`]: (state, action) => {
    return Object.assign({}, state, {
      isPending: false,
      errorMsg: null,
      performerForm: null
    });
  },

}, initialState);
