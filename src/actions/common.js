let user_token;

export const setToken = (token) => user_token = token;

export const getToken = () =>  user_token;

export const defaultHeader = { 'Content-Type' : 'application/json; charset=UTF-8' };

export const serviceUrl = 'https://morning-peak-70516.herokuapp.com';
