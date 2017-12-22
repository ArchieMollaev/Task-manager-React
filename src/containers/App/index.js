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
	TODO,
	IN_PROGRESS,
	DONE
} = constants;
class ToDoList extends React.Component {
	render = () => (
		<div id="todo-app">
			<h1>Task manager</h1>
			<div id="to-do-list-columns">
				<Column className={ TODO } 
								insertComponent={ <TaskCreator onSubmit={ (data) => {
								this.props.addTask({ data, status: TODO })} } /> }
								title="To Do" 
								tasks={ this.props.tasks.toDo }
								removeFunc={ (id) => this.props.deleteTask({ status: TODO, id }) }
								editFunc={ (data) => this.props.editTask({ data, status: TODO }) }
								switchFunc={ (objData) => this.props.switchStatus(objData) } />
				<Column className={ IN_PROGRESS } 
								tasks={ this.props.tasks.inProgress } 
								title="In progress"
								removeFunc={ (id) => this.props.deleteTask({ status: IN_PROGRESS, id }) }
								editFunc={ (data) => this.props.editTask({ data, status: IN_PROGRESS })  } 
								switchFunc={ (objData) => this.props.switchStatus(objData) } />
				<Column className={ DONE } 
								tasks={ this.props.tasks.done } 
								title="Done"
								removeFunc={ (id) => this.props.deleteTask({ status: DONE, id }) }
								editFunc={ (data) => this.props.editTask({ data, status: DONE }) }
								switchFunc={ (objData) => this.props.switchStatus(objData) } />
			</div>
		</div>
	)
}

const mapStateToProps = (state) => ({
	tasks: state.getList
})

const actionsDispatcher = (dispatch) => (
   bindActionCreators(actions, dispatch)
)

export default connect(mapStateToProps, actionsDispatcher)(ToDoList)