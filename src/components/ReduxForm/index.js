import React from 'react'
import { Field, reduxForm } from 'redux-form'

const ListForm = props => {
	const { 
		formId,
		handleSubmit,
		titlePlaceholder,
		notesPlaceholder,
		closeForm,
		pristine,
		submitting
	} = props;
	
	return (
		<form id={ formId } onSubmit={ handleSubmit }>
			<Field className="title-form"
						 name="taskName"
						 type="text"
						 component="textarea"
						 placeholder={ titlePlaceholder }
						 autoComplete="off"
						 autoFocus />
			<Field className="task-des-form" 
						 name="taskNotes"
						 type="text"
						 component="textarea"
						 placeholder={ notesPlaceholder }
						 autoComplete="off" />
			<div>
					<button className="submitTask" type="submit" disabled={pristine || submitting}>
						Add task
					</button>
					<button className="closeForm" type="button" onClick={closeForm}>
						&times;
					</button>
			</div>
		</form>
	)
}

export default reduxForm({
	form: 'list-task-form',
	enableReinitialize: true
})(ListForm);


