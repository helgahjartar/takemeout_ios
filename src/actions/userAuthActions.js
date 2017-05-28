import { NavigationActions } from 'react-navigation';
import { setToken, defaultHeader, serviceUrl } from './common';

export const CREATE_USER = 'CREATE_USER';
export const LOGOUT = 'LOGOUT';
export const LOGIN = 'LOGIN'

export const createUser = (userData) => {
  return dispatch => ({
    type: CREATE_USER,
    payload: new Promise((resolve, reject) => {
      fetch(serviceUrl+'/user/auth/register', {
        method: 'POST',
        headers: defaultHeader,
        body: JSON.stringify(userData)
      }).then(res => {
        console.log(res)
        if (res.ok) {
          dispatch(NavigationActions.navigate({ routeName: 'UserAuthentication' }));
          resolve('User created');
        }
        else reject('Couldn\'t create user')
      })
    })
  })
};

export const logout = () => {
  setToken(null);
  return {
    type: LOGOUT
  }
}

export const login = (userData) => ({
  type: LOGIN,
  payload: new Promise((resolve, reject) => {
    fetch(serviceUrl+'/user/auth/login', {
      method: 'POST',
      headers: defaultHeader,
      body: JSON.stringify(userData)
    }).then(res => {
      console.log(res)
      if (res.ok) {
        resolve(setToken(res.text()));
      }
      else reject(res.text());
    })
  })
});
