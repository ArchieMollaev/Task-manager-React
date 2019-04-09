import {
  LOAD_TASKS,
  PUSH_TASK,
  DELETE_TASK,
  SWITCH_STATUS,
  EDIT_TASK,
  ADD_COLUMN,
  CHANGE_COLUMN_NAME,
  REMOVE_COLUMN,
  SET_EDITABLE,
  TASK_CREATOR_STATUS,
  HOVER_ELEMENT,
  GET_DATA
} from 'const';
import { createReducer } from 'redux-create-reducer';

export const columns = createReducer(
  [],
  {
    [GET_DATA.RESPONSE]: (_, { payload }) => payload.Columns,
    [ADD_COLUMN.RESPONSE]: (state, { payload: { name, id } }) => {
      const newState = [...state, { name, id, Cards: [] }];
      return newState;
    },
    [PUSH_TASK.RESPONSE]: (state, { payload }) => {
      console.log('state', state);
      const update = [...state];
      const index = update.findIndex(({ id }) => id === payload.ColumnId);

      update[index].Cards.push(payload);
      console.log('upd', update);
      return update;
    }
  }
  // {
  //   [LOAD_TASKS.RESPONSE]: (state, { payload }) => ({ ...state, ...payload }),

  //   [PUSH_TASK.RESPONSE]: (state, { payload }) => {
  //     const update = { ...state };
  //     const category = update[payload.status];
  //     category.push(payload.data);
  //     return update;
  //   },

  //   [DELETE_TASK.RESPONSE]: (state, { id, status }) => {
  //     const update = { ...state };
  //     update[status] = state[status].filter(item => item.id !== id);
  //     return update;
  //   },

  //   [SWITCH_STATUS]: (state, { payload: { data, currentStatus, newStatus, position, id } }) => {
  //     const update = { ...state };
  //     update[currentStatus] = update[currentStatus].filter(item => item.id !== id);
  //     if (currentStatus === newStatus) {
  //       update[currentStatus].splice(position, 0, data);
  //     } else update[newStatus].splice(position, 0, data);
  //     return { ...state, ...update };
  //   },

  //   [EDIT_TASK.RESPONSE]: (state, { payload: { status, data } }) => {
  //     const update = { ...state };
  //     update[status].forEach((item, i) => {
  //       if (item.id === data.id) update[status][i] = data;
  //     });
  //     return update;
  //   },

  // [CHANGE_COLUMN_NAME.RESPONSE]: (state, { payload: { currentName, newName } }) => {
  //   const update = { ...state };
  //   update[newName] = update[currentName];
  //   delete update[currentName];
  //   return { ...update };
  // },

  // [REMOVE_COLUMN]: (state, { payload }) => {
  //   const newDate = { ...state };
  //   delete newDate[payload.name];
  //   return newDate;
  // }
  // }
);

export const activeColumnId = createReducer('', {
  [SET_EDITABLE]: (_, { payload }) => payload.columnId || ''
});

export const taskCreatorStatus = createReducer(
  {},
  {
    [TASK_CREATOR_STATUS]: (_, { payload }) => payload.status || {}
  }
);

export const hoverInjector = createReducer(
  {},
  {
    [HOVER_ELEMENT]: (_, { payload }) => payload.id
  }
);

// export const getList = (state = {}, action) => {
//   let update;
//   let category;
//   switch (action.type) {
//     case constants.TASKS_LOADED:
//       return { ...state, ...action.data };
//     case constants.TASK_PUSHED: {
//       update = { ...state };
//       category = update[action.status];
//       category.push(action.data);
//       return update;
//     }
//     case constants.TASK_DELETED: {
//       update = { ...state };
//       update[action.status] = state[action.status].filter(item => item.id !== action.id);
//       return update;
//     }
//     case constants.STATUS_SWITCHED: {
//       const { data, currentStatus, newStatus, position } = action.data;
//       update = { ...state };
//       update[currentStatus] = update[currentStatus].filter(item => item.id !== data.id);
//       if (currentStatus === newStatus) {
//         update[currentStatus].splice(position, 0, data);
//       } else update[newStatus].splice(position, 0, data);
//       return { ...state, ...update };
//     }
//     case constants.TASK_EDITED: {
//       update = { ...state };
//       category = update[action.status];
//       category.forEach((item, i, arr) => {
//         if (item.id === action.data.id) arr[i] = action.data;
//       });
//       return update;
//     }
//     case constants.COLUMN_ADDED: {
//       let newEntry = action.data.name;
//       Object.keys(state).forEach(x => {
//         if (x === newEntry) newEntry += '(duplicate)';
//       });
//       return { ...state, [newEntry]: [] };
//     }
//     case constants.COLUMN_NAME_CHANGED: {
//       const { currentName, newName } = action.data;
//       update = { ...state };
//       update[newName] = update[currentName];
//       delete update[currentName];
//       return { ...update };
//     }
//     case constants.COLUMN_REMOVED: {
//       const newDate = { ...state };
//       delete newDate[action.data.name];
//       return newDate;
//     }
//     default:
//       return state;
//   }
// };

// export const editable = (state = '', action) => {
//   switch (action.type) {
//     case constants.SET_EDITABLE:
//       return action.id || '';
//     default:
//       return state;
//   }
// };

// export const taskCreatorStatus = (state = {}, action) => {
//   switch (action.type) {
//     case constants.TASK_CREATOR_STATUS: {
//       return action.data || {};
//     }
//     default:
//       return state;
//   }
// };

// export const hoverInjector = (state = '', action) => {
//   switch (action.type) {
//     case constants.HOVER_ELEMENT: {
//       return action.data;
//     }
//     default:
//       return state;
//   }
// };
