import React from 'react'
import { Field, reduxForm, reset } from 'redux-form'
import './style.scss'

const TaskForm = ({ handleSubmit, pristine, closeForm, submitting, style }) => (
	<form style={style} id="task-form" onSubmit={handleSubmit}>
		<div>
			<div>
				<Field
					name="taskName"
					autoComplete="off"
					component="input"
					type="text"
					placeholder="task name"
				/>
			</div>
		</div>
		<div>
			<div>
				<Field name="notes" component="textarea" autoComplete="off" placeholder="description"/>
			</div>
		</div>
		<div>
			<button className="submitTask" type="submit" disabled={pristine || submitting}>Add task</button>
			<button className="closeForm" type="button" onClick={closeForm}>
			&times;
			</button>
		</div>
	</form>
)

const afterSubmit = (result, dispatch) =>
  dispatch(reset('add-task-form'));

export default reduxForm({
	form: 'add-task-form',
	onSubmitSuccess: afterSubmit 
})(TaskForm );


