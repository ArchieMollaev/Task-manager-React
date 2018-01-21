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
    if (task.currentStatus === newStatus && position !== 0) {
      position -= 1;
    };
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
     title,
     tasks,
     className,
     connectDropTarget,
     isOver,
     addTask,
     columnName,
     addColumn,
     removeColumn,
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
     <li><button type="button" onClick={() => removeColumn({ name: title.split(' ').join('_') })}>delete list</button></li>
   </ul>);

   return connectDropTarget(<div className={classNames({ 'task-column': true, 'drop-target': isOver })}>
     <input className="column-title" defaultValue={title} />
     <button type="button" className="options" onClick={() => this.setState({ optionsStatus: true })}>...</button>
     { showOptions() }
     <span className="badge">{ tasks.length }</span>
     <ul>
       <div
         className={classNames({ injector: true, 'injector-active': hover === `${0}_injector` && isOver })}
         onDragOver={() => hoverInjector(`${0}_injector`)}
       />
       {tasks.map((item, i) => (
         <div key={item.id + className}>
           <Card
             itemClass={classNames({ 'hover-item': hover === item.id && isOver })}
             status={className}
             editStatus={editable}
             dataID={item.id}
             titleValue={item.taskName}
             notesValue={item.taskNotes}
             classCard={classNames({ 'item-style': getState(item.id) })}
             classTitle={classNames({ title: true, hide: getState(item.id) })}
             classNote={classNames({ 'task-des': true, hide: getState(item.id) })}
             classRemove={classNames({ remove: true, 'remove-show': getState(item.id) })}
             classEdit={classNames({ edit: true, hide: getState(item.id) })}
             htmlFor={`${item.id}${title}`}
             classLabel={classNames({ show: item.taskNotes, hide: getState(item.id) })}
             checkerID={`${item.id}${title}`}
             removeFunc={() => remove(item.id)}
             editFunc={() => edit(item.id)}
             submitFunc={data => formSubmit(data, item.id)}
             canDrag={!getState(item.id)}
           />
           <div
            className={classNames({ injector: true, 'injector-active': hover === `${i + 1}_injector` && isOver })}
            onDragOver={() => hoverInjector(`${i + 1}_injector`)}
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
  title: PropTypes.string.isRequired,
  tasks: PropTypes.array,
  className: PropTypes.string.isRequired,
  connectDropTarget: PropTypes.func.isRequired,
  isOver: PropTypes.bool.isRequired,
  addTask: PropTypes.func.isRequired,
  columnName: PropTypes.string.isRequired,
  addColumn: PropTypes.func.isRequired,
  removeColumn: PropTypes.func.isRequired,
  hover: PropTypes.string.isRequired,
  hoverInjector: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  editable: state.editable,
  hover: state.hoverInjector,
});

Column = DropTarget(Types.ITEM, targetSource, collect)(Column);

export default connect(mapStateToProps, actions)(Column);

