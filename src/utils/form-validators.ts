const Validators = {
  required: (value: any) => (value ? undefined : 'Required'),
  maxLength: (max: any) => (value: any) =>
    value && value.length > max ? `Must be ${max} characters or less` : undefined,
  minLength: (min: any) => (value: any) =>
    value && value.length < min ? `Must be ${min} characters or more` : undefined,
  email: (value: any) =>
    value && !/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)
      ? 'Invalid email address'
      : undefined
};

export default Validators;
