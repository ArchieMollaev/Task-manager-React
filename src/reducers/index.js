import { combineReducers } from 'redux'
import { getList, editable } from './tasks'
import { reducer as reduxFormReducer } from 'redux-form'

const reducers = combineReducers({
	getList,
	editable,
	form: reduxFormReducer
})

export default reducers