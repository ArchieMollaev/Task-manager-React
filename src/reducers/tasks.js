import * as constants from 'const'
const {
  TASKS_LOADED,
  TASK_PUSHED,
  TASK_EDITED,
  TASK_DELETED,
  STATUS_SWITCHED,
  SET_EDITABLE,
  TASK_CREATOR_STATUS
} = constants;

const initialState = { toDo: [], inProgress: [], done: [] };

export const getList = (state = initialState, action) => {
  let update, category;
  switch (action.type) {
    case TASKS_LOADED:
      return {...state, ...action.data}
    case TASK_PUSHED:
      update = {...state};
      category = update[ action.status ];
      category.push({
        ...action.data, 
        id: category.length == 0 ? 1 : category[ category.length - 1 ].id + 1
      })
      return update;
    case TASK_DELETED:
      update = {...state};
      update[ action.status ] = 
      state[ action.status ].filter(item => item.id != action.id);
      return update;
    case STATUS_SWITCHED:
      update = {...state};
      category = update[ action.currentStatus ];
      let newCategory = update[ action.newStatus ];
      category.forEach((item, i, arr) => {
        item.id == action.id ? arr.splice(i, 1) : null;
      })
      newCategory.push({
        ...action.data, 
        id: newCategory.length == 0 ? 1 : newCategory[ newCategory.length - 1 ].id + 1
      })
      return update;
     case TASK_EDITED:  
      update = {...state};
      category = update[ action.status ];
      category.forEach((item, i, arr) => {
        item.id == action.data.id ? 
        arr[i] = action.data : null;
      })
      return update;
    default:
      return state
  }
}

export const editable = (state = 0, action) => {
  switch (action.type) {
    case SET_EDITABLE: 
      return action.id || {...state}
    default:
      return state
  }
}

const initialStateTaskCreator = { toDo: false, inProgress: false, done: false };

export const taskCreatorStatus = (state = initialStateTaskCreator, action) => {
  switch (action.type) {
    case TASK_CREATOR_STATUS:
      return action.data && { ...initialStateTaskCreator, ...action.data } || initialStateTaskCreator
    default:
      return state
  }
}

