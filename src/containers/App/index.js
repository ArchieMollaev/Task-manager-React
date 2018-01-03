import React from 'react'
import ReactDOM from 'react-dom'
import { reset } from 'redux-form'
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
const titles = ['To Do', 'In progress', 'Done'];

const ToDoList = props => {	
	const {
		reset, 
		addTask, 
		deleteTask, 
		editTask, 
		switchStatus, 
		taskCreatorStatus
	} = props;
	
	return (
		<div id="todo-app">
			<h1>Task manager</h1>
			<div id="to-do-list-columns">
				{
					list.map((itemName, i) => (
						<Column key={ itemName } className={ itemName } 
								insertComponent={ 
									<TaskCreator 
										onSubmit={ (data) => { reset("create-task"); addTask({ data, status: itemName }) } }
										col={ itemName } /> 
								}
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

const mapStateToProps = state => ({
	tasks: state.getList
})

export default connect(mapStateToProps, {...actions, reset })(ToDoList)