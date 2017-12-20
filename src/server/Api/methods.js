
import request from './request'
const host = 'http://localhost:3000';

export const getAllTasks = () => request({
	method: 'GET',
	url: `${host}/db`
});

export const pushTask = (status, taskData) => request({
	method: 'POST',
	url: `${host}/${status}`,
	data: taskData
});

export const editTask = (id, status, taskData) => request({
	method: 'PATCH',
	url: `${host}/${status}/${id}`,
	data: taskData
});

export const deleteTask = (id, status) => request({
	method: 'DELETE',
	url: `${host}/${status}/${id}`
});


