
import request from './request';

export const getAllTasks = () => request({
  method: 'GET',
  url: 'db',
});

export const pushTask = (status, data) => request({
  method: 'POST',
  url: `${status}`,
  data,
});

export const editTask = (id, status, data) => request({
  method: 'PATCH',
  url: `${status}/${id}`,
  data,
});

export const deleteTask = (id, status) => request({
  method: 'DELETE',
  url: `${status}/${id}`,
});

export const updateList = data => request({
  method: 'POST',
  url: 'update',
  data,
});

export const addNewColumn = data => request({
  method: 'POST',
  data,
});

export const removeColumn = data => request({
  method: 'POST',
  url: '/delete',
  data,
});

export const renameColumn = data => request({
  method: 'POST',
  url: '/rename_column',
  data,
});

