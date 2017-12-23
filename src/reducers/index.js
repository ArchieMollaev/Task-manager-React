import { combineReducers } from 'redux'
import { getList, editable, taskCreatorStatus } from './tasks'
import { reducer as reduxFormReducer } from 'redux-form'

const reducers = combineReducers({
	getList,
	editable,
	taskCreatorStatus,
	form: reduxFormReducer
})

export default reducers