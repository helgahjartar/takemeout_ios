import { SAVE_EVENT_FORM, SAVE_PERFORMER_FORM, SAVE_LOCATION_FORM } from '../actions/index';

function form(state = { }, action) {
  switch (action.type) {
    case SAVE_EVENT_FORM:
      return Object.assign({}, state, {
        eventName: action.eventName,
        eventDesc: action.eventDesc
      });
    case SAVE_PERFORMER_FORM:
      return Object.assign({}, state, {
        performerName: action.performerName,
        performerDescIce: action.performerDescIce,
        performerDescEng: action.performerDescEng
      });
    case SAVE_LOCATION_FORM:
      return Object.assign({}, state, {
        locationName: action.locationName,
        locationAddress: action.locationAddress
      });
    default:
      return state;
  }
}

export default form;
