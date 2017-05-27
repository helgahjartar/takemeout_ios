import {serviceUrl, defaultHeader} from './common';

export const FETCH_EVENTS = 'FETCH_EVENTS';

export const fetchEvents = () => ({
  type: FETCH_EVENTS,
  payload: new Promise(resolve => {
    fetch(serviceUrl+'/event/query/events', {
      method: 'GET',
      headers: defaultHeader
    }).then(res => {
      resolve(res.json());
    })
  })
});

export function fetchLocations() {
  return dispatch => {
    return fetch(serviceUrl+'/event/query/locations', {
      method: 'GET',
      headers: defaultHeader
    }).then(response => response.json());
      // Todo: Add error handling
  }
}

export function fetchPerformers() {
  return dispatch => {
    return fetch(serviceUrl+'/event/query/performers', {
      method: 'GET',
      headers: defaultHeader
    }).then(response => response.json());
      // Todo: Add error handling
  }
}
