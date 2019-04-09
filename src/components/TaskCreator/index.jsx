import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/common';
import TaskForm from 'components/Forms/app-forms/Task-form';
import { reset } from 'redux-form';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

const TaskCreator = props => {
  const { activeColumnId, onSubmit, column, taskCreatorStatus, setEditable, columnId } = props;

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

TaskCreator.propTypes = {
  activeColumnId: PropTypes.objectOf(PropTypes.bool).isRequired,
  onSubmit: PropTypes.func.isRequired,
  column: PropTypes.string.isRequired,
  taskCreatorStatus: PropTypes.func.isRequired,
  setEditable: PropTypes.func.isRequired
};

const mapStateToProps = ({ activeColumnId }) => ({
  activeColumnId
});

export default connect(
  mapStateToProps,
  { ...actions, reset }
)(TaskCreator);
