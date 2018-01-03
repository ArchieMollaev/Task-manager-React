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
		if (editable != id + title) {
			setEditable(id + title)
			taskCreatorStatus()
		}	
	}

	const switcher = (taskData, currentStatus, newStatus) => {
		const { taskName, taskNotes, id } = taskData;
		let sendData = {
			id,
			data: {taskName, taskNotes},
			newStatus,
			currentStatus
		}
		switchFunc(sendData)
	}

	const remove = id => {
		setEditable()
		removeFunc(id)
	}
	
	const showForm = (id, taskName, taskNotes) => {
		return editable === id + title &&
		<Form 
			initialValues={{ taskName, taskNotes }}
			form="editor"
			f1name="taskName"
			f2name="taskNotes"
			submitBtnTitle='✔'
			onSubmit={ (data) => data.taskName === '' ? remove(id) : editFunc({ id, ...data }) && setEditable() }
			placeholder1="add title..."
			placeholder2="add description here..."/>
	}

	const setStyle = (id, style1, style2) => (
		editable == id + title ? 
		style1 || { display: 'block' } : style2 || {}
	)

	const classes = (staticClass, dynamicClass, id) => (
		classNames({
			[staticClass]: true,
			[dynamicClass]: editable === id + title
		})
	)

	return (
		<div className={ className } >
				<h2>{ title }</h2>
				<span>{ tasks.length }</span>
				<ul>
					{
					tasks.map((item, i) => (
								<li key={ item.id + className } 
										data-id={ item.id }
										className={ classes(null, 'item-style', item.id) }>
								<Textarea className={ classes('title', 'hide', item.id) }
													type="text"
													value={ item.taskName }
													readOnly />
								<label htmlFor={ `${ item.id }${ title }` }
											 style={{ ...item.taskNotes && { display: 'block' } || {},
											 ...setStyle(item.id, { display: 'none' }) }}>notes</label>
								<input className="checker" 
											 type="checkbox" 
											 id={ `${ item.id }${ title }` }></input>
								<Textarea className={ classes('task-des', 'hide', item.id) } 
													type="text"
													value={ item.taskNotes }
													readOnly />
								<span className="remove" 
											onClick={ () => remove(item.id) }
											style={ setStyle(item.id) }><i className="fa fa-trash-o" aria-hidden="true"></i></span>
								<span className={ classes('switcher st1', 'show', item.id) } 
											onClick={ () => switcher(item, className, TODO) } >1</span> 
								<span className={ classes('switcher st2', 'show', item.id) }  
											onClick={ () => switcher(item, className, IN_PROGRESS) } >2</span> 
								<span className={ classes('switcher st3', 'show', item.id) }  
											onClick={ () => switcher(item, className, DONE) } >3</span>
								<button className={ classes('edit', 'hide', item.id) } 
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