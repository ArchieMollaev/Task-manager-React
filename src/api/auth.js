import request from './request';

export const login = data =>
  request({
    method: 'POST',
    url: 'login',
    data
  });

export const validateLogin = data =>
  request({
    method: 'POST',
    url: 'validate-login',
    data
  });

export const signUp = data =>
  request({
    method: 'POST',
    url: 'signup',
    data
  });
