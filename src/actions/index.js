//import { createAction } from 'redux-actions';
import { NavigationActions } from 'react-navigation';

export const CREATE_USER = 'CREATE_USER';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const SAVE_EVENT_FORM = 'SAVE_EVENT_FORM';
export const SAVE_PERFORMER_FORM = 'SAVE_PERFORMER_FORM';
export const SAVE_LOCATION_FORM = 'SAVE_LOCATION_FORM';

export const FETCH_EVENTS = 'FETCH_EVENTS';

let user_token = null;
const defaultHeader = {
  'Content-Type' : 'application/json; charset=UTF-8'
};
const serviceUrl = 'https://morning-peak-70516.herokuapp.com';

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
    return fetch('https://morning-peak-70516.herokuapp.com/event/query/locations', {
      method: 'GET',
      headers: { "Content-Type" : "application/json; charset=UTF-8" }
    }).then(response => response.json());
      // Todo: Add error handling
  }
}

export function fetchPerformers() {
  return dispatch => {
    return fetch('https://morning-peak-70516.herokuapp.com/event/query/performers', {
      method: 'GET',
      headers: { "Content-Type" : "application/json; charset=UTF-8" }
    }).then(response => response.json());
      // Todo: Add error handling
  }
}

function createEventSuccess() {
  return {
    type: CREATE_EVENT_SUCCESS,
    success: true,
    hasBeenSent: true
  };
}

function createEventFailure() {
  return {
    type: CREATE_EVENT_FAILURE,
    success: false,
    hasBeenSent: true
  };
}

function receiveLogin() {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true
  };
}

function registrationError(msg) {
  return {
    type: REGISTRATION_ERROR,
    errorMessage: msg
  };
}

function loginError() {
  return {
    type: LOGIN_ERROR,
    errorMessage: 'User not authenticated',
    isAuthenticated: false,
    hasBeenSent: true
  };
}

export function createEvent(data) {
  return dispatch => {
    return fetch(serviceUrl+'/event/registration/event', {
      method: 'POST',
      headers: Object.assign({}, defaultHeader, {'token' : user_token}),
      body: JSON.stringify(data)
    }).then(res => {
      if (res.status === 200)
        dispatch(createEventSuccess());
      else
        dispatch(createEventFailure());
    });
  };
}

export function createUser(userData) {
  return dispatch => {
    return fetch(serviceUrl+'/user/auth/register', {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(userData)
    }).then(res => {
      if (res.ok) dispatch(NavigationActions.navigate({ routeName: 'UserAuthentication' }));
      else dispatch(registrationError('User already exists'));
    });
  };
}

export function logOutUser() {
  user_token = null;
  return {
    type: LOGOUT,
    errorMessage: '',
    isAuthenticated: false,
    hasBeenSent: false
  }
}

export function logInUser(userData) {
  return dispatch => {
    return fetch(serviceUrl+'/user/auth/login', {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(userData)
    }).then(res => {
      if (res.ok) {
        res.text().then(token => {
          user_token = token;
          dispatch(receiveLogin());
        });
      } else {
        dispatch(loginError());
      }
    });
  };
}
