import request from '../request';

export const addNewColumn = data =>
  request({
    method: 'POST',
    url: '/create-column',
    data,
  });

export const removeColumn = data =>
  request({
    method: 'POST',
    url: '/delete',
    data,
  });

export const renameColumn = data =>
  request({
    method: 'POST',
    url: '/rename_column',
    data,
  });
