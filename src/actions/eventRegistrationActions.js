import {serviceUrl, defaultHeader, getToken} from './common';

export const SAVE_EVENT_FORM = 'SAVE_EVENT_FORM';
export const SAVE_PERFORMER_FORM = 'SAVE_PERFORMER_FORM';
export const SAVE_LOCATION_FORM = 'SAVE_LOCATION_FORM';
export const CREATE_EVENT = 'CREATE_EVENT';

export const saveEventForm = (data) => ({
  type: SAVE_EVENT_FORM,
  eventName: data.name,
  eventDesc: data.description
})

export const savePerformerForm = (data) => ({
  type: SAVE_PERFORMER_FORM,
  performerName: data.performer,
  performerDescIce: data.descriptionIce,
  performerDescEng: data.descriptionEng
})

export const saveLocationForm = (data) => ({
  type: SAVE_LOCATION_FORM,
  locationName: data.location,
  locationAddress: data.address
})

export const createEvent = (data) => ({
  type: CREATE_EVENT,
  payload: new Promise(resolve => {
    fetch(serviceUrl+'event/registration/event' , {
      method: 'POST',
      headers: Object.assign({}, defaultHeader, { 'token' : getToken() }),
      body: JSON.stringify(data)
    }).then(res => {
      if (res.ok) resolve("Event created successfully");
      else reject("Couldn't create event");
    })
  })
});
