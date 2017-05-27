import {serviceUrl, defaultHeader, getToken} from './common';

export const SAVE_EVENT_FORM = 'SAVE_EVENT_FORM';
export const SAVE_PERFORMER_FORM = 'SAVE_PERFORMER_FORM';
export const SAVE_LOCATION_FORM = 'SAVE_LOCATION_FORM';

export const CREATE_EVENT = 'CREATE_EVENT'

export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';

export function saveEventForm(data) {
  return {
    type: SAVE_EVENT_FORM,
    eventName: data.name,
    eventDesc: data.description
  };
}

export function savePerformerForm(data) {
  return {
    type: SAVE_PERFORMER_FORM,
    performerName: data.performer,
    performerDescIce: data.descriptionIce,
    performerDescEng: data.descriptionEng
  };
}

export function saveLocationForm(data) {
  return {
    type: SAVE_LOCATION_FORM,
    locationName: data.location,
    locationAddress: data.address
  };
}

export const createEvent2 = (data) => ({
  type: CREATE_EVENT,
  payload: new Promise(resolve => {
    fetch(serviceUrl+'event/registration/event' , {
      method: 'POST',
      headers: Object.assign({}, defaultHeader, { 'token' : getToken() }),
      body: JSON.stringify(data)
    }).then(res => resolve(res.status >= 200 && res.status < 300))
  })
});

export function createEvent(data) {
  return dispatch => {
    return fetch(serviceUrl+'/event/registration/event', {
      method: 'POST',
      headers: Object.assign({}, defaultHeader, { 'token' : getToken() }),
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 200)
        dispatch(createEventSuccess());
      else
        dispatch(createEventFailure());
    });
  };
}
