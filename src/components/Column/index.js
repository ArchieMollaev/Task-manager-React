import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import Form from 'components/ReduxForm'
import * as actions from 'actions/Task'
import * as constants from 'const'
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
			right: '65px',
			background: '#75ce46',
			color: 'white',
			border: 'none'
		}
	}

	edit = (id, title) => {
		if (this.props.editable != id + title) {
			this.props.setEditable(id + title)
			this.props.hideTaskCreator(false)
		}	else {
			this.refs.form.submit()
			this.props.setEditable()
		}
	}

	submit = (data, id) => {
		this.props.editFunc({ id, ...data})
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
	
	showForm = (id, taskName, taskNotes) => (
		this.props.editable == id + this.props.title &&
		<Form initialValues={{ taskName, taskNotes }} 
					ref="form" 
					onSubmit={ (data) => this.submit(data, id) }/>
	)

	setStyle = (id, style1, style2) => (
		this.props.editable == id + this.props.title ? 
		style1 || { display: 'block' } : style2 || {}
	)

	render = () => (
		<div className={ this.props.className } >
				<h2>{ this.props.title }</h2>
				<span>{ this.props.tasks.length }</span>
				{ this.props.insertComponent }
				<ul>
					{
					this.props.tasks.map((item, i) => (
							<li key={ item.id + this.props.className } 
									data-id={ item.id }
									style={ this.setStyle(item.id, { background: 'white' }) }>
								<input className="title"
											 type="text"
											 value={ item.taskName }
											 readOnly
											 autoComplete="off"
											 ref={ (input) => this.title = input }></input>
								<label htmlFor={ `${ item.id }${ this.props.title }` }>notes</label>
								<input className="checker" 
											type="checkbox" 
											id={ `${ item.id }${ this.props.title }` }></input>
								<textarea className="task-des" 
											type="text"
											value={ item.taskNotes }
											readOnly
											autoComplete="off"
											ref={ (textarea) => this.notes = textarea }></textarea>
								<span className="remove" 
											onClick={ () => this.remove(item.id) }
											style={ this.setStyle(item.id) }>remove</span>
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
												{ this.setStyle(item.id, 'save', 'edit') }</button>
								{	this.showForm(item.id, item.taskName, item.taskNotes) }
							</li>
						))
					}
				</ul>
			</div>
		)
}

const mapStateToProps = (state) => ({
		editable: state.editable
})
	
const actionsDispatcher = (dispatch) => (
   bindActionCreators(actions, dispatch)
);

export default connect(mapStateToProps, actionsDispatcher)(Column)