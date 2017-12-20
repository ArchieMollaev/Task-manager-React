import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/Task'
import Column from 'components/Column'
import TaskCreator from 'containers/TaskCreator'

import * as constants from 'const'

const {
  PUSH_TASK,
	DELETE_TASK,
	EDIT_TASK,
	SWITCH_STATUS,
} = constants;

class ToDoList extends React.Component {
	addToDo = (data, status = 'toDo') => {
		this.props.addTask({ type: PUSH_TASK,	data, status })
	}
	remove = (id, status) => {
		this.props.deleteTask({ type: DELETE_TASK, status, id })
	}
	edit = (data, status) => {
		this.props.editTask({ type: EDIT_TASK, data, status })	
	}
	switchStatus = ({ id, data, currentStatus, newStatus }) => {
		this.props.switchStatus({ type: SWITCH_STATUS, id, data, currentStatus,	newStatus })
	}	
	render = () => (
		<div id="todo-app">
			<h1>Task manager</h1>
			<div id="to-do-list-columns">
				<Column className="toDo" 
								insertComponent={ <TaskCreator onSubmit={(data) => this.addToDo(data)} /> }
								title="To Do" 
								tasks={ this.props.tasks.toDo }
								removeFunc={ (id) => this.remove(id, 'toDo') }
								editFunc={ (data) => this.edit(data, 'toDo') }
								switchFunc={ (values) => this.switchStatus(values, 'toDo') } />
				<Column className="inProgress" 
								tasks={ this.props.tasks.inProgress } 
								title="In progress"
								removeFunc={ (id) => this.remove(id, 'inProgress') }
								editFunc={ (data) => this.edit(data, 'inProgress') } 
								switchFunc={ (values) => this.switchStatus(values, 'inProgress') } />
				<Column className="done" 
								tasks={ this.props.tasks.done } 
								title="Done"
								removeFunc={ (id) => this.remove(id, 'done') }
								editFunc={ (data) => this.edit(data, 'done') }
								switchFunc={ (values) => this.switchStatus(values, 'done') } />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		tasks: state.getList
	} 
}
const actionsDispatcher = (dispatch) => {
   return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, actionsDispatcher)(ToDoList)