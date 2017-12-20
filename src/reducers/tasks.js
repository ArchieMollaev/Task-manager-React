import * as constants from 'const'
const {
  TASKS_LOADED,
  TASK_PUSHED,
  TASK_EDITED,
  TASK_DELETED,
  STATUS_SWITCHED,
  SET_EDITABLE
} = constants;

const initialState = { toDo: [], inProgress: [], done: [] };

export const getList = (state = initialState, action) => {
  let update, category;
  switch (action.type) {
    case TASKS_LOADED:
      return Object.assign({}, state, action.data)
    case TASK_PUSHED:
      update = Object.assign({}, state);
      category = update[ action.status ];
      category.push({
        ...action.data, 
        id: category.length == 0 ? 1 : category[ category.length - 1 ].id + 1
      })
      return update;
    case TASK_DELETED:
      update = Object.assign({}, state);
      category = update[ action.status ];
      category.forEach((item, i, arr) => {
        if (item.id == action.id) {
          let index = arr.indexOf(item)
          arr.splice(index, 1)
        }
      })
      return update;
    case STATUS_SWITCHED:
      update = Object.assign({}, state);
      category = update[ action.currentStatus ];
      let newCategory = update[ action.newStatus ];
      newCategory.push({
        ...action.data, 
        id: newCategory.length == 0 ? 1 : newCategory[ newCategory.length - 1 ].id + 1
      })
      category.forEach((item, i, arr) => {
        if (item.id == action.id) {
          let index = arr.indexOf(item)
          arr.splice(index, 1)
        }
      })
      return update;
     case TASK_EDITED:  
      update = Object.assign({}, state);
      category = update[ action.status ];
      category.forEach((item, i, arr) => {
        if (item.id == action.data.id) {
          arr[i] = action.data
        }
      })
      return update;
    default:
      return state
  }
}

export const setEditable = (state = 0, action) => {
  switch (action.type) {
    case SET_EDITABLE: 
      return action.id
    default:
      return state
  }
}