import { combineReducers } from 'redux'
import { getList, editable, closeTaskCreator } from './tasks'
import { reducer as reduxFormReducer } from 'redux-form'

const reducers = combineReducers({
	getList,
	editable,
	closeTaskCreator,
	form: reduxFormReducer
})

export default reducers