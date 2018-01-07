import React from 'react'
import { connect } from 'react-redux'
// import Form from 'components/ReduxForm'
import Card from 'components/Card'
import { submit } from 'redux-form'
import * as actions from 'actions/Task'
import * as constants from 'const'
import Textarea from 'react-textarea-autosize'
import classNames from 'classnames'
import { DropTarget } from 'react-dnd'
import './style.scss'


const {
	TODO,
	IN_PROGRESS,
	DONE
} = constants

const switchList = [TODO, IN_PROGRESS, DONE];

const Types = {
	ITEM: 'card'
 }

 const targetSource = {
  drop(props, monitor) {
		const task = monitor.getItem(),
					newStatus = props.className;
    props.switchFunc({
			...task,
			newStatus
		}) 
  }
};


 function collect(connect, monitor) { 
		return {
			connectDropTarget: connect.dropTarget(),
			isOver: monitor.isOver()
		}
 }
class Column extends React.Component {
	render = () => {
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
			insertComponent,
			connectDropTarget,
			newStatus,
			dropStatus,
			targetData,
			isOver
		} = this.props;

		
		const edit = id => {
			setEditable(id + className)
			taskCreatorStatus()
		}
	
		const remove = id => {
			setEditable()
			removeFunc(id)
		}
		
		const formSubmit = (data, id) => {
			!data.taskName ? remove(id) :
			editFunc({ id, ...data }) && setEditable()
		}
	
		const getState = id => editable === id + className
		
		return connectDropTarget(
			<div className={ classNames({[className]: true, 'drop-target': isOver }) }>
					<h2>{ title }</h2>
					<span className="badge">{ tasks.length }</span>
					<ul>
						{
						tasks.map((item, i) => (
								<Card key={ item.id + className }
											status={ className }
											editStatus={ editable }
											dataID={ item.id }
											titleValue={ item.taskName }
											notesValue={ item.taskNotes }
											classCard={ classNames({'item-style': getState(item.id)}) }
											classTitle={ classNames({'title': true, 'hide': getState(item.id)}) }
											classNote={ classNames({'task-des': true, 'hide': getState(item.id)}) }
											classRemove={ classNames({'remove': true, 'show': getState(item.id)}) }
											classEdit={ classNames({'edit': true, 'hide': getState(item.id)}) }
											htmlFor={ `${ item.id }${ title }` }
											classLabel={ classNames({'show': item.taskNotes, 'hide': getState(item.id)}) }
											checkerID={ `${ item.id }${ title }` }
											removeFunc={ () => remove(item.id) }
											editFunc={ () => edit(item.id) }
											submitFunc={ data => formSubmit(data, item.id) } 
											switchFunc={ () => switcher(item, className, newStatus) }
											canDrag={ !getState(item.id) } />))
						}
					</ul>
					{ insertComponent }
				</div>
		)
	}
}

const mapStateToProps = state => ({
		editable: state.editable
})

Column = DropTarget(Types.ITEM, targetSource, collect)(Column)

export default connect(mapStateToProps, actions)(Column)

