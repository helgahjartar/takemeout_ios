import { handleActions } from 'redux-actions';
import { CREATE_EVENT } from '../actions/eventRegistrationActions';

const initialState = {
  isPending: false,
  success: false,
  hasBeenSent: false
};

export default handleActions({
  [`${CREATE_EVENT}_PENDING`]: (state, action) => ({
    isPending: true,
    success: false,
    hasBeenSent: false
  }),

  [`${CREATE_EVENT}_REJECTED`]: (state, action) => ({
    isPending: false,
    success: false,
    hasBeenSent: true
  }),

  [`${CREATE_EVENT}_FULFILLED`]: (state, action) => ({
    isPending: false,
    success: true,
    hasBeenSent: true
  })
}, initialState);
