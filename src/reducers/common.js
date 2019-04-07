import * as constants from 'const';

export const getList = (state = {}, action) => {
  let update;
  let category;
  switch (action.type) {
    case constants.TASKS_LOADED:
      return { ...state, ...action.data };
    case constants.TASK_PUSHED: {
      update = { ...state };
      category = update[action.status];
      category.push(action.data);
      return update;
    }
    case constants.TASK_DELETED: {
      update = { ...state };
      update[action.status] = state[action.status].filter(item => item.id !== action.id);
      return update;
    }
    case constants.STATUS_SWITCHED: {
      const { data, currentStatus, newStatus, position } = action.data;
      update = { ...state };
      update[currentStatus] = update[currentStatus].filter(item => item.id !== data.id);
      if (currentStatus === newStatus) {
        update[currentStatus].splice(position, 0, data);
      } else update[newStatus].splice(position, 0, data);
      return { ...state, ...update };
    }
    case constants.TASK_EDITED: {
      update = { ...state };
      category = update[action.status];
      category.forEach((item, i, arr) => {
        if (item.id === action.data.id) arr[i] = action.data;
      });
      return update;
    }
    case constants.COLUMN_ADDED: {
      let newEntry = action.data.name;
      Object.keys(state).forEach(x => {
        if (x === newEntry) newEntry += '(duplicate)';
      });
      return { ...state, [newEntry]: [] };
    }
    case constants.COLUMN_NAME_CHANGED: {
      const { currentName, newName } = action.data;
      update = { ...state };
      update[newName] = update[currentName];
      delete update[currentName];
      return { ...update };
    }
    case constants.COLUMN_REMOVED: {
      const newDate = { ...state };
      delete newDate[action.data.name];
      return newDate;
    }
    default:
      return state;
  }
};

export const editable = (state = '', action) => {
  switch (action.type) {
    case constants.SET_EDITABLE:
      return action.id || '';
    default:
      return state;
  }
};

export const taskCreatorStatus = (state = {}, action) => {
  switch (action.type) {
    case constants.TASK_CREATOR_STATUS: {
      return action.data || {};
    }
    default:
      return state;
  }
};

export const hoverInjector = (state = '', action) => {
  switch (action.type) {
    case constants.HOVER_ELEMENT: {
      return action.data;
    }
    default:
      return state;
  }
};
