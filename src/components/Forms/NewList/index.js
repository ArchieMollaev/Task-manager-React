import React from 'react';
import { Field, reduxForm } from 'redux-form';
import PropTypes from 'prop-types';
import './style.scss';

const NewListForm = (props) => {
  const {
    handleSubmit,
    closeFunc,
  } = props;

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
      <button type="submit" className="submit">save</button>
      <button type="button" className="close" onClick={closeFunc}>x</button>
    </form>
  );
};

NewListForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  closeFunc: PropTypes.func.isRequired,
};


export default reduxForm({
  form: 'new-list',
})(NewListForm);

