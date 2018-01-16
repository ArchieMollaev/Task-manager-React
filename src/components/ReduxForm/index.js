import React from 'react';
import { Field, reduxForm } from 'redux-form';

const ListForm = (props) => {
  const {
    formId,
    handleSubmit,
    f1name, f2name, f3name, f4name,
    placeholder1, placeholder2, placeholder3, placeholder4,
    type1, type2, type3, type4,
    comp1, comp2, comp3, comp4,
    showField3, showField4,
    submitBtnTitle,
    secondBtnTitle,
    secondBtnFunc,
    pristine,
    submitting,
  } = props;

  return (
    <form id={formId} onSubmit={handleSubmit} >
      <Field
        className="fields field1"
        name={f1name || 'f1'}
        type={type1 || 'text'}
        component={comp1 || 'textarea'}
        placeholder={placeholder1}
        autoComplete="off"
        autoFocus
        required
      />
      <Field
        className="fields field2"
        name={f2name || 'f2'}
        type={type2 || 'text'}
        component={comp2 || 'textarea'}
        placeholder={placeholder2}
        autoComplete="off"
      />
      <Field
        className="fields field3"
        name={f3name || 'f3'}
        type={type3 || 'text'}
        component={comp3 || 'textarea'}
        style={{ display: showField3 || 'none' }}
        placeholder={placeholder3}
        autoComplete="off"
      />
      <Field
        className="fields field4"
        name={f4name || 'f4'}
        type={type4 || 'text'}
        component={comp4 || 'textarea'}
        style={{ display: showField4 || 'none' }}
        placeholder={placeholder4}
        autoComplete="off"
      />
      <div>
        <button className="first-btn" type="submit">
          { submitBtnTitle || 'add task'}
        </button>
        <button className="second-btn" type="button" onClick={secondBtnFunc}>
          { secondBtnTitle || 'х' }
        </button>
      </div>
    </form>
  );
};

export default reduxForm({
  form: ['text'],
  enableReinitialize: true,
})(ListForm);

