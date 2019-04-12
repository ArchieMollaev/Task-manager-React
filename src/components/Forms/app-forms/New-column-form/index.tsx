import * as React from 'react';
import { Field, reduxForm } from 'redux-form';
import './style.scss';

const NewColumnForm = props => {
  const { handleSubmit, closeFunc } = props;

  return (
    <form className="new-list" onSubmit={handleSubmit}>
      <Field
        name="name"
        component="input"
        type="text"
        placeholder="list name"
        autoComplete="off"
        autoFocus
        required
      />
      <button type="submit" className="submit">
        save
      </button>
      <button type="button" className="close" onClick={closeFunc}>
        x
      </button>
    </form>
  );
};

export default reduxForm({
  form: 'new-column-form'
})(NewColumnForm);
