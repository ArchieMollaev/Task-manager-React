import React from 'react'
import { connect } from 'react-redux'
import Form from 'components/ReduxForm'
import * as actions from 'actions/Task'
import * as constants from 'const'
import Textarea from 'react-textarea-autosize'
import './style.scss'

const {
	TODO,
	IN_PROGRESS,
	DONE
} = constants
class Column extends React.Component {
	state = {
		btnStyle: {
			display: 'block',
			right: '35px',
			border: '1px solid grey',
			color: 'grey'
		}
	}

	edit = (id, title) => {
		if (this.props.editable != id + title) {
			this.props.setEditable(id + title)
			this.props.taskCreatorStatus()
		}	else {
			this.refs.form.submit()
			this.props.setEditable()
		}
	}

	switcher = (taskData, currentStatus, newStatus) => {
		const { taskName, taskNotes, id } = taskData;
		let sendData = {
			id,
			data: {taskName, taskNotes},
			newStatus,
			currentStatus
		}
		this.props.switchFunc(sendData)
	}

	remove = (id) => {
		this.props.setEditable()
		this.props.removeFunc(id)
	}
	
	showForm = (id, taskName, taskNotes) => {
		return this.props.editable === id + this.props.title &&
		<Form initialValues={{ taskName, taskNotes }}
					form={"edit-task"}
					f1name="taskName"
					f2name="taskNotes"
					ref="form" 
					onSubmit={ (data) => data.taskName === '' ? this.remove(id) : this.props.editFunc({ id, ...data }) }
					placeholder1="add title..."
					placeholder2="add description here..."/>
	}

	setStyle = (id, style1, style2) => (
		this.props.editable == id + this.props.title ? 
		style1 || { display: 'block' } : style2 || {}
	)

	render = () => (
		<div className={ this.props.className } >
				<h2>{ this.props.title }</h2>
				<span>{ this.props.tasks.length }</span>
				<ul>
					{
					this.props.tasks.map((item, i) => (
								<li key={ item.id + this.props.className } 
									data-id={ item.id }
									style={ this.setStyle(item.id, { background: 'white' }) }>
								<Textarea className="title"
											 type="text"
											 value={ item.taskName }
											 style={ this.setStyle(item.id, { display: 'none' }) }
											 readOnly
											 autoComplete="off"
											 />
								<label htmlFor={ `${ item.id }${ this.props.title }` }
											 style={{ ...item.taskNotes && { display: 'block' } || {},
											 ...this.setStyle(item.id, { display: 'none' }) }}>notes</label>
								<input className="checker" 
											type="checkbox" 
											id={ `${ item.id }${ this.props.title }` }></input>
								<Textarea className="task-des" 
											type="text"
											value={ item.taskNotes }
											style={ this.setStyle(item.id, { display: 'none' }) }
											readOnly
											autoComplete="off"
											/>
								<span className="remove" 
											onClick={ () => this.remove(item.id) }
											style={ this.setStyle(item.id) }><i className="fa fa-trash-o" aria-hidden="true"></i></span>
								<span className="switcher st1" 
											onClick={ () => this.switcher(item, this.props.className, TODO) }
											style={ this.setStyle(item.id) }>1</span> 
								<span className="switcher st2" 
											onClick={ () => this.switcher(item, this.props.className, IN_PROGRESS) }
											style={ this.setStyle(item.id) }>2</span> 
								<span className="switcher st3" 
											onClick={ () => this.switcher(item, this.props.className, DONE) }
											style={ this.setStyle(item.id) }>3</span>
								<button className="edit" 
												type="button"  
												style={ this.setStyle(item.id, this.state.btnStyle) }
												onClick={ () => this.edit(item.id, this.props.title) }>
												{ this.setStyle(item.id, '✔', 'edit') }</button>
								{	this.showForm(item.id, item.taskName, item.taskNotes) }
							</li>
						))
					}
				</ul>
				{ this.props.insertComponent }
			</div>
	)
}

const mapStateToProps = (state) => ({
		editable: state.editable
})
	
export default connect(mapStateToProps, actions)(Column)