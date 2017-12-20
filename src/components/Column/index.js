import React from 'react'
import { connect } from 'react-redux'
import { bindActionCreators } from 'redux'
import * as actions from 'actions/Task'
import './style.scss'


class Column extends React.Component {
	state = {
		titleVal: null,
		notesVal: null,
		areaStyle: {
			fontStyle: 'italic',
			background: 'white', 
			color: 'grey', 
			cursor: 'text'
		},
		btnStyle: {
			display: 'block',
			right: '65px',
			background: '#75ce46',
			color: 'white',
			border: 'none'
		}
	}

	edit = (id, title) => {
		if (this.props.editable == id + title) {
			this.props.setEditable('')
			this.props.editFunc({ id, taskName: this.state.title, notes: this.state.notes })
		} else {
			this.props.setEditable(id + title);
		}	
	}
	switcher = (taskData, status, newStatus, id) => {
		let data = {
			id: id,
			data: {
				taskName: taskData.taskName,  
				notes: taskData.notes
			}, 
			newStatus: newStatus,
			currentStatus: status
		}
		this.props.switchFunc(data)
	}

	remove = (id) => {
		this.props.setEditable('')
		this.props.removeFunc(id)
	}
	
	render = () => (
	<div className={this.props.className} >
			<h2>{this.props.title}</h2>
			<span>{this.props.tasks.length}</span>
			{this.props.insertComponent}
			<ul>
				{
				this.props.tasks.map((item, i) => (
						<li key={ item.id + this.props.title } data-id={ item.id } 
						style={this.props.editable == item.id ? {background: 'white', outline: '1px solid #c9c9c9'} : {}}>
							<input className="title" type="text" 
										 defaultValue={ item.taskName }
										 style={ this.props.editable == item.id + this.props.title ? this.state.areaStyle : {} }
										 readOnly={this.props.editable == item.id + this.props.title ? false : true}
										 onChange={ (e) => this.setState({title: e.target.value}) } >
							</input>
							<label htmlFor={ `${ item.id }${ this.props.title }` }>notes</label>
							<input className="checker" 
										 type="checkbox" 
										 id={ `${ item.id }${ this.props.title }` }>
							</input>
							<textarea className="task-des" 
												defaultValue={ item.notes }
												style={this.props.editable == item.id + this.props.title ? this.state.areaStyle : {}} 
												readOnly={this.props.editable == item.id + this.props.title ? false : true}
												onChange={ (e) => this.setState({ notes: e.target.value })} >
							</textarea>
							<span className="remove" 
										onClick={ () => this.remove(item.id) }
										style={this.props.editable == item.id + this.props.title ? {display: 'block'} : {} }>remove</span>
							<span className="switcher st1" 
										onClick={ () => this.switcher(item, this.props.className, 'toDo', item.id) } style={this.props.editable == item.id + this.props.title ? {display: 'block'} : {} }>1</span> 
							<span className="switcher st2" 
										onClick={ () => this.switcher(item, this.props.className, 'inProgress', item.id) } style={this.props.editable == item.id + this.props.title ? {display: 'block'} : {} }>2</span> 
							<span className="switcher st3" 
										onClick={ () => this.switcher(item, this.props.className, 'done', item.id) } 
										style={this.props.editable == item.id + this.props.title ? {display: 'block'} : {} }>3</span>
							<button className="edit" type="button" 
											onClick={() => this.edit(item.id, this.props.title)}
											style={this.props.editable == item.id + this.props.title ? this.state.btnStyle : {}}>
											{this.props.editable == item.id + this.props.title ? 'save' : 'edit'}</button>
						</li>
					))
				}
			</ul>
		</div>
	)
}

const mapStateToProps = (state) => {
	return {
		editable: state.editable
	} 
}
const actionsDispatcher = (dispatch) => {
   return bindActionCreators(actions, dispatch);
};

export default connect(mapStateToProps, actionsDispatcher)(Column)