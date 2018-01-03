import React from 'react'
import ReactDOM from 'react-dom'
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom'
import { connect } from 'react-redux'
import * as actions from 'actions/Task'
import Column from 'components/Column'
import TaskCreator from 'containers/TaskCreator'
import * as constants from 'const'

const {
  PUSH_TASK,
	DELETE_TASK,
	EDIT_TASK,
	SWITCH_STATUS,
	TODO,
	IN_PROGRESS,
	DONE
} = constants;

const list = [TODO, IN_PROGRESS, DONE];

const ToDoList = (props) => {	
	const { 
		addTask, 
		deleteTask, 
		editTask, 
		switchStatus, 
		taskCreatorStatus
	} = props;
	
	const titles = ['To Do', 'In progress', 'Done'];
	return (
		<div id="todo-app">
			<h1>Task manager</h1>
			<div id="to-do-list-columns">
				{
					list.map((itemName, i) => (
						<Column key={ itemName } className={ itemName } 
								insertComponent={ <TaskCreator onSubmit={ (data) => {
								addTask({ data, status: itemName });
								taskCreatorStatus() }}
								col={ itemName } /> }
								title={ titles[i] } 
								tasks={ props.tasks[itemName] }
								removeFunc={ (id) => deleteTask({ status: itemName, id }) }
								editFunc={ (data) => editTask({ data, status: itemName }) }
								switchFunc={ (objData) => switchStatus(objData) } />
					))
				}
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	tasks: state.getList
})

export default connect(mapStateToProps, actions)(ToDoList)