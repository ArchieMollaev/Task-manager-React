import { combineReducers } from 'redux'
import { getList, setEditable } from './tasks'
import { reducer as reduxFormReducer } from 'redux-form'

const reducers = combineReducers({
	getList: getList,
	editable: setEditable,
	form: reduxFormReducer
})

export default reducers