import {serviceUrl, defaultHeader} from './common';

export const FETCH_EVENTS = 'FETCH_EVENTS';
export const FETCH_PERFORMERS = 'FETCH_PERFORMERS';
export const FETCH_LOCATIONS = 'FETCH_LOCATIONS';
export const FETCH_TYPES = 'FETCH_TYPES';

export const fetchEvents = () => ({
  type: FETCH_EVENTS,
  payload: new Promise((resolve, reject) => {
    fetch(serviceUrl+'/event/query/events', {
      method: 'GET',
      headers: defaultHeader
    }).then(res => {
      if (res.ok) resolve(res.json());
      else reject("Couldn't get Events from server");
    })
  })
});

export const fetchLocations = () => ({
  type: FETCH_LOCATIONS,
  payload: new Promise((resolve, reject) => {
    fetch(serviceUrl+'/event/query/locations', {
      method: 'GET',
      headers: defaultHeader
    }).then(res => {
      if (res.ok) resolve(res.json());
      else reject("Couldn't get locations from server");
    })
  })
});

export const fetchPerformers = () => ({
  type: FETCH_PERFORMERS,
  payload: new Promise((resolve, reject) => {
    fetch(serviceUrl+'/event/query/performers', {
      method: 'GET',
      headers: defaultHeader
    }).then(res => {
      if (res.ok) resolve(res.json());
      else reject("Couldn't get performers from server");
    })
  })
});

export const fetchTypes = () => ({
  type: FETCH_TYPES,
  payload: new Promise((resolve, reject) => {
    fetch(serviceUrl+'/event/query/types', {
      method: 'GET',
      headers: defaultHeader
    }).then(res => {
      if (res.ok) resolve(res.json());
      else reject("Couldn't get types from server");
    })
  })
});
