let user_token;

export const setToken = (token) => {
  user_token = token ? token._65 : token;
}

export const getToken = () => { return user_token; }

export const defaultHeader = { 'Content-Type' : 'application/json; charset=UTF-8' };

export const serviceUrl = 'https://morning-peak-70516.herokuapp.com';
