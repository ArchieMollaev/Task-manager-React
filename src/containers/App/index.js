import React from 'react';
import { reset } from 'redux-form';
import { BrowserRouter as Router, Route, Link, Switch, NavLink, Redirect } from 'react-router-dom';
import { connect } from 'react-redux';
import * as actions from 'actions/Task';
import Column from 'components/Column';
import TaskCreator from 'containers/TaskCreator';
import * as constants from 'const';
import HTML5Backend from 'react-dnd-html5-backend';
import { DragDropContext } from 'react-dnd';
import CardDragPreview from 'components/DragLayer';

const {
  TODO,
  IN_PROGRESS,
  DONE,
} = constants;

const LIST = ['ToDo', 'InProgress', 'Done'];
// const columnTitles = ['To Do', 'In progress', 'Done'];

const replaceCamelCase = (target) => {
  const rex = /([A-Z])([A-Z])([a-z])|([a-z])([A-Z])/g;
  return target.replace(rex, '$1$4 $2$3$5');
};

let ToDoList = (props) => {
  const {
    reset,
    addTask,
    deleteTask,
    editTask,
    switchStatus,
    taskCreatorStatus,
    tasks,
  } = props;
  const addColumn = () => {
    LIST.push('new column');
  };

  return (
    <div id="todo-app" >
      <h1>Task manager</h1>
      <div id="to-do-list-columns">
        <CardDragPreview />
        {Object.keys(tasks).map(name => (<Column
          columnName={name}
          key={name}
          className={name}
          title={replaceCamelCase(name)}
          tasks={tasks[name.replace(' ', '')] || []}
          removeFunc={id => deleteTask({ status: name, id })}
          editFunc={data => editTask({ data, status: name })}
          switchFunc={objData => switchStatus(objData)}
        />))}
        <button type="button" className="add-column" onClick={() => addColumn()}>add column</button>
      </div>
    </div>
  );
};

const mapStateToProps = state => ({
  tasks: state.getList,
});

ToDoList = DragDropContext(HTML5Backend)(ToDoList);

export default connect(mapStateToProps, { ...actions, reset })(ToDoList);
