import { buildHttpActionTypes } from '../utils/redux-utils';
// auth
export const SIGN_IN = buildHttpActionTypes('SIGN_IN');
export const SIGN_UP = buildHttpActionTypes('SIGN_UP');
export const GET_DATA = buildHttpActionTypes('GET_DATA');
export const VALIDATE_LOGIN = buildHttpActionTypes('VALIDATE_LOGIN');

// common
export const PUSH_TASK = buildHttpActionTypes('PUSH_TASK');
export const LOAD_TASKS = buildHttpActionTypes('LOAD_TASKS');
export const EDIT_TASK = buildHttpActionTypes('EDIT_TASK');
export const DELETE_TASK = buildHttpActionTypes('DELETE_TASK');
export const SWITCH_STATUS = buildHttpActionTypes('SWITCH_STATUS');
export const ADD_COLUMN = buildHttpActionTypes('ADD_COLUMN');
export const REMOVE_COLUMN = buildHttpActionTypes('REMOVE_COLUMN');
export const CHANGE_COLUMN_NAME = buildHttpActionTypes('CHANGE_COLUMN_NAME');

// ui
export const HOVER_ELEMENT = 'HOVER_ELEMENT';
export const SET_EDITABLE = 'SET_EDITABLE';
export const TASK_CREATOR_STATUS = 'TASK_CREATOR_STATUS';
