import React from 'react';
import TaskForm from 'components/TaskForm'
import './style.scss'

export default class TaskCreator extends React.Component {
	state = {
		showForm: false
	}
	showForm = () => {
		this.setState({showForm: true})
	}
	
	closeForm = () => {
		this.setState({showForm: false})
	}

	render = () => {
		const addTaskForm = () => {
			if (this.state.showForm) {
			  return <TaskForm onSubmit={this.props.onSubmit} closeForm={this.closeForm} />
			}
		}
		return ( 
			<div id='task-creator' style={ this.state.showForm ? {marginBottom: '130px'} : {} } >
				<button className='add-task' type='button' onClick={this.showForm}>
					new task
				</button>
				{addTaskForm()}
			</div>
		)				
	}
}


