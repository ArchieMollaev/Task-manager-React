import React from 'react'
import { connect } from 'react-redux'
import Form from 'components/ReduxForm'
import { submit } from 'redux-form'
import * as actions from 'actions/Task'
import * as constants from 'const'
import Textarea from 'react-textarea-autosize'
import classNames from 'classnames'
import './style.scss'


const {
	TODO,
	IN_PROGRESS,
	DONE
} = constants

const switchList = [TODO, IN_PROGRESS, DONE];

const Column = props => {
	const {
		editable,
		setEditable,
		taskCreatorStatus,
		switchFunc,
		removeFunc,
		editFunc,
		title,
		tasks,
		className,
		insertComponent
	} = props;

	const edit = (id, title, form) => {
		setEditable(id + title)
		taskCreatorStatus()
	}

	const switcher = (taskData, currentStatus, newStatus) => {
		const { taskName, taskNotes, id } = taskData;
		switchFunc({
			id,
			data: {taskName, taskNotes},
			newStatus,
			currentStatus
		})
	}

	const remove = id => {
		setEditable()
		removeFunc(id)
	}
	
	const formSubmit = (data, id) => {
		!data.taskName ? remove(id) :
		editFunc({ id, ...data }) && setEditable()
	}

	const showForm = (id, taskName, taskNotes) => (
		editable === id + title &&
		<Form initialValues={{ taskName, taskNotes }}
					formId="editor"
					form="editor"
					f1name="taskName"
					f2name="taskNotes"
					submitBtnTitle='✔'
					onSubmit={ data => formSubmit(data, id) }
					placeholder1="add title..."
					placeholder2="add description here..."/>
	)

	const getState = id => editable === id + title;

	return (
		<div className={ className } >
				<h2>{ title }</h2>
				<span>{ tasks.length }</span>
				<ul>
					{
					tasks.map((item, i) => (
								<li key={ item.id + className } 
										data-id={ item.id }
										className={ classNames({'item-style': getState(item.id)}) }>
								<Textarea className={ classNames({'title': true, 'hide': getState(item.id)}) }
													type="text"
													value={ item.taskName }
													readOnly />
								<label htmlFor={ `${ item.id }${ title }` }
											 className={ classNames({'show': item.taskNotes, 'hide': getState(item.id)}) }
											 >notes</label>
								<input className="checker" 
											 type="checkbox" 
											 id={ `${ item.id }${ title }` }></input>
								<Textarea className={ classNames({'task-des': true, 'hide': getState(item.id)}) } 
													type="text"
													value={ item.taskNotes }
													readOnly />
								<span className={ classNames({'remove': true, 'show': getState(item.id)}) } 
											onClick={ () => remove(item.id) }
											><i className="fa fa-trash-o" aria-hidden="true"></i></span>
											{
												switchList.map((status, i) => (
													<span key={ status } 
																className={ classNames({[`switcher st${i+1}`]: true, 'show': getState(item.id)}) } 
																onClick={ () => switcher(item, className, status) } >{i+1}</span>
												))
											}
								<button className={ classNames({'edit': true, 'hide': getState(item.id)}) } 
												type="button"
												onClick={ () => edit(item.id, title, Form) }>
												edit</button>
								{	showForm(item.id, item.taskName, item.taskNotes) }
							</li>
						))
					}
				</ul>
				{ insertComponent }
			</div>
	)
}

const mapStateToProps = state => ({
		editable: state.editable
})

export default connect(mapStateToProps, actions )(Column)