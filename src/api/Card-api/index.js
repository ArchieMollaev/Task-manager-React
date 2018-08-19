
import request from '../request';

export const create = data => request({
  method: 'POST',
  url: 'create-card',
  data,
});

export const editTask = (id, status, data) => request({
  method: 'PATCH',
  url: `${status}/${id}`,
  data,
});

