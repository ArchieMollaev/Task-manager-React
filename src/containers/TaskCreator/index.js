import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions/Task'
import Form from 'components/ReduxForm'
import './style.scss'
class TaskCreator extends React.Component {
	addTaskForm = () => (
		this.props.showForm[this.props.col] &&
			<Form formId="task-form"
						form="create-task"
						f1name="taskname"
						f2name="taskNotes"
						onSubmit={ this.props.onSubmit }
						secondBtnFunc={ () => this.props.taskCreatorStatus({[this.props.col]: false}) }
						titlePlaceholder="Task name"
						notesPlaceholder="Description" />
	)
	render = () => (
		<div id='task-creator' style={ this.props.showForm[this.props.col] ? { marginBottom: '130px' } : {} } >
			<button className='add-task' 
							type='button'
							style={ this.props.showForm[this.props.col] ? { display: 'none' } : {} }
							onClick={ () => { this.props.taskCreatorStatus({ [this.props.col]: true }); this.props.setEditable() } }>
				add card...
			</button>
			{ this.addTaskForm() }
		</div>
	)
}

const mapStateToProps = (state) => ({
	showForm: state.taskCreatorStatus,
	editable: state.editable
})

export default connect(mapStateToProps, actions)(TaskCreator)
