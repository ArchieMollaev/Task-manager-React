import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/common';
import TaskForm from 'components/Forms/app-forms/Task-form';
import { reset } from 'redux-form';
import classNames from 'classnames';
import './style.scss';

const TaskCreator = props => {
  const { activeColumnId, onSubmit, setEditable, columnId } = props;

  const addTaskForm = () =>
    activeColumnId === columnId && (
      <TaskForm
        formId="task-form"
        form="create-task"
        onSubmit={e => {
          onSubmit(e);
          reset('create-task');
        }}
        secondBtnFunc={() => setEditable({ columnId: null })}
        placeholder1="Task name"
        placeholder2="Description"
      />
    );

  return (
    <div
      id="task-creator"
      className={classNames({ 'spread-task-creator': activeColumnId === columnId })}
    >
      <button
        className={classNames({ 'add-task': true, hide: activeColumnId === columnId })}
        type="button"
        onClick={() => {
          // taskCreatorStatus({ [column]: true });
          setEditable({ columnId });
        }}
      >
        add card...
      </button>
      {addTaskForm()}
    </div>
  );
};

const mapStateToProps = ({ activeColumnId }) => ({
  activeColumnId
});

export default connect(
  mapStateToProps,
  { ...actions, reset }
)(TaskCreator);
