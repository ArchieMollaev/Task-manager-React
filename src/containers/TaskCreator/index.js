import React from 'react'
import { connect } from 'react-redux'
import Form from 'components/ReduxForm'
import './style.scss'
class TaskCreator extends React.Component {
	state = {
		showForm: this.props.hideCreator.set
	}

	componentWillReceiveProps = (nextProp) => {
		this.setState({ showForm: nextProp.hideCreator.set })
	}

	render = () => {
		const addTaskForm = () => (
			this.state.showForm &&
				<Form formId="task-form"
							onSubmit={ this.props.onSubmit }
							closeForm={ () => this.setState({ showForm: false }) }
							titlePlaceholder="Task name"
							notesPlaceholder="Description" />
		)
		return ( 
			<div id='task-creator' style={ this.state.showForm ? { marginBottom: '130px' } : {} } >
				<button className='add-task' type='button' onClick={ () => this.setState({ showForm: true }) }>
					new task
				</button>
				{ addTaskForm() }
			</div>
		)
	}
}

const mapStateToProps = (state) => ({
	hideCreator: state.closeTaskCreator
})

export default connect(mapStateToProps, null)(TaskCreator)
