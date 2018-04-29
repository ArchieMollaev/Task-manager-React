import React from 'react';
import { connect } from 'react-redux';
import * as actions from 'actions/Common-actions';
import TaskForm from 'components/Forms/app-forms/Task-form';
import { reset } from 'redux-form';
import classNames from 'classnames';
import PropTypes from 'prop-types';
import './style.scss';

const TaskCreator = (props) => {
  const {
    showForm,
    onSubmit,
    column,
    taskCreatorStatus,
    setEditable,
  } = props;

  const addTaskForm = () => (
    showForm[column] &&
    <TaskForm
      formId="task-form"
      form="create-task"
      onSubmit={(e) => { onSubmit(e); reset('create-task'); }}
      secondBtnFunc={() => taskCreatorStatus({ [column]: false })}
      placeholder1="Task name"
      placeholder2="Description"
      />
  );

  return (
    <div id="task-creator" className={classNames({ 'spread-task-creator': showForm[column] })} >
      <button
        className={classNames({ 'add-task': true, hide: showForm[column] })}
        type="button"
        onClick={() => { taskCreatorStatus({ [column]: true }); setEditable(); }}
      >add card...
      </button>
      { addTaskForm() }
    </div>
  );
};

TaskCreator.propTypes = {
  showForm: PropTypes.objectOf(PropTypes.bool).isRequired,
  onSubmit: PropTypes.func.isRequired,
  column: PropTypes.string.isRequired,
  taskCreatorStatus: PropTypes.func.isRequired,
  setEditable: PropTypes.func.isRequired,
};

const mapStateToProps = state => ({
  showForm: state.taskCreatorStatus,
  editable: state.editable,
});

export default connect(mapStateToProps, { ...actions, reset })(TaskCreator);
