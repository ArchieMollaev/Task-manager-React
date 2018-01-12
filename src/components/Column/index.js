import React from 'react';
import { connect } from 'react-redux';
import { reset } from 'redux-form';
import Card from 'components/Card';
import TaskCreator from 'containers/TaskCreator';
import * as actions from 'actions/Task';
import classNames from 'classnames';
import { DropTarget } from 'react-dnd';
import './style.scss';

const Types = {
  ITEM: 'card',
};

const targetSource = {
  drop(props, monitor) {
    const task = monitor.getItem();
    const newStatus = props.className;
    props.switchFunc({
      ...task,
      newStatus,
    });
  },
};

function collect(connector, monitor) {
  return {
    connectDropTarget: connector.dropTarget(),
    isOver: monitor.isOver(),
  };
}

let Column = (props) => {
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
  } = props;

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

  return connectDropTarget(<div className={classNames({ 'task-column': true, 'drop-target': isOver })}>
    <h2>{ title }</h2>
    <span className="badge">{ tasks.length }</span>
    <ul>
      {tasks.map(item => (<Card
        key={item.id + className}
        status={className}
        editStatus={editable}
        dataID={item.id}
        titleValue={item.taskName}
        notesValue={item.taskNotes}
        classCard={classNames({ 'item-style': getState(item.id) })}
        classTitle={classNames({ title: true, hide: getState(item.id) })}
        classNote={classNames({ 'task-des': true, hide: getState(item.id) })}
        classRemove={classNames({ remove: true, show: getState(item.id) })}
        classEdit={classNames({ edit: true, hide: getState(item.id) })}
        htmlFor={`${item.id}${title}`}
        classLabel={classNames({ show: item.taskNotes, hide: getState(item.id) })}
        checkerID={`${item.id}${title}`}
        removeFunc={() => remove(item.id)}
        editFunc={() => edit(item.id)}
        submitFunc={data => formSubmit(data, item.id)}
        canDrag={!getState(item.id)}
      />))}
    </ul>
    <TaskCreator
      onSubmit={(data) => { reset('create-task'); addTask({ data, status: columnName }); }}
      column={columnName}
    />
  </div>);
};

const mapStateToProps = state => ({
  editable: state.editable,
});

Column = DropTarget(Types.ITEM, targetSource, collect)(Column);

export default connect(mapStateToProps, actions)(Column);

