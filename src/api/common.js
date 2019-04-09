import request from './request';

export const createTask = data =>
  request({
    method: 'POST',
    url: '/create-card',
    data
  });

export const editTask = (id, status, data) =>
  request({
    method: 'PATCH',
    url: `${status}/${id}`,
    data
  });

export const deleteTask = (id, status) =>
  request({
    method: 'DELETE',
    url: `${status}/${id}`
  });

export const updateList = data =>
  request({
    method: 'POST',
    url: 'update',
    data
  });

export const addNewColumn = data =>
  request({
    method: 'POST',
    url: '/create-column',
    data
  });

export const removeColumn = data =>
  request({
    method: 'POST',
    url: '/delete',
    data
  });

export const renameColumn = data =>
  request({
    method: 'POST',
    url: '/rename_column',
    data
  });

export const getData = () =>
  request({
    method: 'GET',
    url: 'get-data'
  });
