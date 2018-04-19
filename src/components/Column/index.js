import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Card from 'components/Card';
import TaskCreator from 'components/TaskCreator';
import * as actions from 'actions/Task';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import { DropTarget } from 'react-dnd';

import './style.scss';

const Types = {
  ITEM: 'card',
};

const targetSource = {
  drop(props, monitor) {
    const task = monitor.getItem();
    const newStatus = props.className;
    let position = props.hover.split('_')[0];
    if (task.currentStatus === newStatus &&
       task.currentPosition < position) position -= 1;
    const sendData = {
      ...task,
      newStatus,
      position,
    };
    props.switchFunc(sendData);
  },
};

const collect = (connector, monitor) => ({
  connectDropTarget: connector.dropTarget(),
  isOver: monitor.isOver(),
});

const replaceSpaces = target => target.split(' ').join('_');
class Column extends React.Component {
 state = {
   optionsStatus: false,
 }

 render = () => {
   const {
     editable,
     setEditable,
     taskCreatorStatus,
     removeFunc,
     editFunc,
     colTitle,
     tasks,
     className,
     connectDropTarget,
     isOver,
     addTask,
     columnName,
     removeColumn,
     renameColumn,
     hover,
     hoverInjector,
   } = this.props;

   const { optionsStatus } = this.state;

   const edit = (id) => {
     setEditable(id + className);
     taskCreatorStatus();
   };

   const remove = (id) => {
     setEditable();
     removeFunc(id);
   };

   const formSubmit = (data, id) => {
     if (!data.taskName) { remove(id); } else {
       editFunc({ id, ...data });
       setEditable();
     }
   };

   const getState = id => editable === id + className;

   const showOptions = () => (optionsStatus &&
   <ul className="options-menu">
     <li>options<button type="button" onClick={() => this.setState({ optionsStatus: false })}>х</button></li>
     <li><button type="button" onClick={() => removeColumn({ name: replaceSpaces(colTitle) })}>delete list</button></li>
   </ul>);

   return connectDropTarget(<div className={classNames({ 'task-column': true, 'drop-target': isOver })}>
     <input className="column-title" defaultValue={colTitle} onBlur={(e) => { renameColumn({ currentName: replaceSpaces(colTitle), newName: replaceSpaces(e.target.value) }) }} />
     <button type="button" className="options" onClick={() => this.setState({ optionsStatus: true })}>...</button>
     { showOptions() }
     <span className="badge">{ tasks.length }</span>
     <ul>
       <div
         className={classNames({ injector: true, 'injector-active': hover === `${0}_injector` && isOver })}
         onDragOver={() => hoverInjector(`${0}_injector`)}
       />
       {tasks.map(({ id, title, description }, i) => (
         <div key={id + className}>
           <Card
             itemClass={classNames({ 'hover-item': hover === id && isOver })}
             status={className}
             editStatus={editable}
             dataID={id}
             position={i}
             titleValue={title}
             notesValue={description}
             classCard={classNames({ 'item-style': getState(id) })}
             classTitle={classNames({ title: true, hide: getState(id) })}
             classNote={classNames({ 'task-des': true, hide: getState(id) })}
             classRemove={classNames({ remove: true, 'remove-show': getState(id) })}
             classEdit={classNames({ edit: true, hide: getState(id) })}
             htmlFor={`${id}${title}`}
             classLabel={classNames({ show: description, hide: getState(id) })}
             checkerID={`${id}${title}`}
             removeFunc={() => remove(id)}
             editFunc={() => edit(id)}
             submitFunc={data => formSubmit(data, id)}
             canDrag={!getState(id)}
             injectorClass={classNames({ injector: true, 'injector-active': hover === `${i+1}_injector` && isOver })}
             injectorHoverFunc={() => hoverInjector(`${i+1}_injector`)}
           />
         </div>))}
     </ul>
     <TaskCreator
       onSubmit={(data) => { reset('create-task'); addTask({ data, status: columnName }); }}
       column={columnName}
     />
    </div>);
 }
}

Column.propTypes = {
  editable: PropTypes.string.isRequired,
  setEditable: PropTypes.func.isRequired,
  taskCreatorStatus: PropTypes.func.isRequired,
  removeFunc: PropTypes.func.isRequired,
  editFunc: PropTypes.func.isRequired,
  colTitle: PropTypes.string.isRequired,
  tasks: PropTypes.arrayOf(PropTypes.object),
  className: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  addTask: PropTypes.func.isRequired,
  columnName: PropTypes.string.isRequired,
  removeColumn: PropTypes.func.isRequired,
  hover: PropTypes.string.isRequired,
  hoverInjector: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editable: state.editable,
  hover: state.hoverInjector,
});

class ColumnDndConnected extends DropTarget(Types.ITEM, targetSource, collect)(Column) {}

export default connect(mapStateToProps, actions)(ColumnDndConnected);

