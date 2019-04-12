import * as React from 'react';
import { Field, reduxForm } from 'redux-form';

const TaskForm = props => {
  const { formId, handleSubmit, placeholder1, placeholder2, submitBtnTitle, secondBtnFunc } = props;

  const autoExpand = e => {
    console.log(e.target.rows);
  };

  return (
    <form id={formId} onSubmit={handleSubmit}>
      <Field
        className="field1"
        name="title"
        type="text"
        component="textarea"
        placeholder={placeholder1}
        autoComplete="off"
        autoFocus
        required
      />
      <Field
        className="field2"
        name="description"
        type="text"
        component="textarea"
        placeholder={placeholder2}
        onChange={e => {
          autoExpand(e);
        }}
        autoComplete="off"
      />
      <div>
        <button className="first-btn" type="submit">
          {submitBtnTitle || 'add task'}
        </button>
        <button className="second-btn" type="button" onClick={secondBtnFunc}>
          х
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: ['text'],
  enableReinitialize: true
})(TaskForm);
