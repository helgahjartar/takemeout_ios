import {serviceUrl, defaultHeader, getToken} from './common';

export const SAVE_EVENT_FORM = 'SAVE_EVENT_FORM';
export const SAVE_PERFORMER_FORM = 'SAVE_PERFORMER_FORM';
export const SAVE_LOCATION_FORM = 'SAVE_LOCATION_FORM';
export const CREATE_EVENT = 'CREATE_EVENT';
export const CREATE_PERFORMER = 'CREATE_PERFORMER';
export const CREATE_LOCATION = 'CREATE_LOCATION';

export const saveEventForm = (data) => ({
  type: SAVE_EVENT_FORM,
  formData: data
})

export const savePerformerForm = (data) => ({
  type: SAVE_PERFORMER_FORM,
  formData: data
})

export const saveLocationForm = (data) => ({
  type: SAVE_LOCATION_FORM,
  formData: data
})

export const createEvent = (data) => ({
  type: CREATE_EVENT,
  payload: new Promise((resolve, reject) => {
    fetch(serviceUrl+'/event/registration/event' , {
      method: 'POST',
      headers: Object.assign({}, defaultHeader, { 'token' : getToken() }),
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) resolve("Event created successfully");
      else reject("Couldn't create event");
    })
  })
});
