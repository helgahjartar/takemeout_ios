import { createAction } from 'redux-actions';
import { NavigationActions } from 'react-navigation';

export const CREATE_USER = 'CREATE_USER';
export const RECEIVE_EVENTS = 'RECEIVE_EVENTS';
export const CREATE_EVENT_SUCCESS = 'CREATE_EVENT_SUCCESS';
export const CREATE_EVENT_FAILURE = 'CREATE_EVENT_FAILURE'
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const LOGIN_USER = 'LOGIN_USER';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';
export const LOGOUT = 'LOGOUT';
export const SAVE_EVENT_FORM = 'SAVE_EVENT_FORM';
export const SAVE_PERFORMER_FORM = 'SAVE_PERFORMER_FORM';
export const SAVE_LOCATION_FORM = 'SAVE_LOCATION_FORM';

let user_token = null;

function receiveEvents(events) {
  return {
    type: RECEIVE_EVENTS,
    events: events
  }
}

export function saveEventForm(data) {
  return {
    type: SAVE_EVENT_FORM,
    eventName: data.name,
    eventDesc: data.description
  }
}

export function savePerformerForm(data) {
  return {
    type: SAVE_PERFORMER_FORM,
    performerName: data.performer,
    performerDescIce: data.descriptionIce,
    performerDescEng: data.descriptionEng
  }
}

export function saveLocationForm(data) {
  return {
    type: SAVE_LOCATION_FORM,
    locationName: data.location,
    locationAddress: data.address
  }
}

export function fetchEvents() {
  return dispatch => {
    return fetch("https://morning-peak-70516.herokuapp.com/event/query/events", {
      method: "GET",
      headers: { "Content-Type" : "application/json; charset=UTF-8" }
    }).then(response => response.json())
      .then(json => dispatch(receiveEvents(json)))
      // Todo: Add error handling
  }
}

export function fetchLocations() {
  return dispatch => {
    return fetch("https://morning-peak-70516.herokuapp.com/event/query/locations", {
      method: "GET",
      headers: { "Content-Type" : "application/json; charset=UTF-8" }
    }).then(response => response.json())
      // Todo: Add error handling
  }
}

export function fetchPerformers() {
  return dispatch => {
    return fetch("https://morning-peak-70516.herokuapp.com/event/query/performers", {
      method: "GET",
      headers: { "Content-Type" : "application/json; charset=UTF-8" }
    }).then(response => response.json())
      // Todo: Add error handling
  }
}

function createEventSuccess() {
  return {
    type: CREATE_EVENT_SUCCESS,
    success: true,
    hasBeenSent: true
  }
}

function createEventFailure() {
  return {
    type: CREATE_EVENT_FAILURE,
    success: false,
    hasBeenSent: true
  }
}

function receiveLogin(user) {
  return {
    type: LOGIN_SUCCESS,
    isAuthenticated: true
  }
}

function registrationError(msg) {
  return {
    type: REGISTRATION_ERROR,
    errorMessage: msg
  }
}

function loginError(user) {
  return {
    type: LOGIN_ERROR,
    errorMessage: 'User not authenticated',
    isAuthenticated: false,
    hasBeenSent: true
  }
}

export function createEvent(data) {
  console.log(user_token)
  console.log(data);

  return dispatch => {
    return fetch("https://morning-peak-70516.herokuapp.com/event/registration/event", {
      method: "POST",
      headers: {
        "Content-Type" : "application/json; charset=UTF-8",
        "token" : user_token
      },
      body: JSON.stringify(data)
    }).then(res => {
        if (res.status === 200)
          dispatch(createEventSuccess())
        else
          dispatch(createEventFailure())
    })
  }
}

export function createUser(userData) {
  return dispatch => {
    return fetch("https://morning-peak-70516.herokuapp.com/user/auth/register", {
      method: "POST",
      headers: { "Content-Type" : "application/json; charset=UTF-8"},
      body: JSON.stringify(userData)
    }).then(res => {
      if (res.ok) dispatch(NavigationActions.navigate({ routeName: 'UserAuthentication' }));
      else dispatch(registrationError("User already exists"))
    })
  }
}

export function logOutUser() {
  user_token = null;
  return {
    type: LOGOUT,
    errorMessage: null,
    isAuthenticated: false,
    hasBeenSent: false
  }
}

export function logInUser(userData) {

  return dispatch => {
    return fetch("https://morning-peak-70516.herokuapp.com/user/auth/login", {
      method: "POST",
      headers: { "Content-Type" : "application/json; charset=UTF-8"},
      body: JSON.stringify(userData)
    }).then(res => {
      if (res.ok) {
        res.text().then(token => {
          user_token = token;
          dispatch(receiveLogin(userData));
        });
      } else {
        dispatch(loginError(userData));
      }
    })
  }
}
