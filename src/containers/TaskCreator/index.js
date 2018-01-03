import React from 'react'
import { connect } from 'react-redux'
import * as actions from 'actions/Task'
import Form from 'components/ReduxForm'
import './style.scss'
const TaskCreator = props => {
	const {
		showForm,
		onSubmit,
		col,
		taskCreatorStatus,
		setEditable
	} = props;

	const addTaskForm = () => (
		showForm[col] &&
			<Form 
				formId="task-form"
				form="create-task"
				f1name="taskName"
				f2name="taskNotes"
				onSubmit={ onSubmit }
				secondBtnFunc={ () => taskCreatorStatus({[col]: false}) }
				placeholder1="Task name"
				placeholder2="Description" />
	)
	return (
		<div id='task-creator' style={ showForm[col] ? { marginBottom: '130px' } : {} } >
			<button 
				className='add-task' 
				type='button'
				style={ showForm[col] ? { display: 'none' } : {} }
				onClick={ () => { taskCreatorStatus({ [col]: true }); setEditable() } }>
				add card...
			</button>
			{ addTaskForm() }
		</div>
	)
}

const mapStateToProps = (state) => ({
	showForm: state.taskCreatorStatus,
	editable: state.editable
})

export default connect(mapStateToProps, actions)(TaskCreator)
