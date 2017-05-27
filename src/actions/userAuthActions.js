import { NavigationActions } from 'react-navigation';
import { setToken, defaultHeader, serviceUrl } from './common';

export const CREATE_USER = 'CREATE_USER';
export const REGISTRATION_ERROR = 'REGISTRATION_ERROR';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN'

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

function registrationError(msg) {
  return {
    type: REGISTRATION_ERROR,
    errorMessage: msg
  };
}

export const logout = () => {
  setToken(null);
  return {
    type: LOGOUT,
    errorMessage: '',
    isAuthenticated: false,
    hasBeenSent: false
  }
}

export const login = (userData) => ({
  type: LOGIN,
  payload: new Promise(resolve => {
    fetch(serviceUrl+'/user/auth/login', {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(userData)
    }).then(res => {
      resolve(setToken(res.text()));
    })
  })
});
