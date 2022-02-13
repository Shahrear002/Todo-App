const Validator = require('validator');
const isEmpty = require('./is-empty');

module.exports = validateTodoInput = (data) => {
  let errors = {};

  data.todo = !isEmpty(data.todo) ? data.todo : '';

  if (Validator.isEmpty(data.todo)) {
    errors.todo = 'Field can not be empty';
  }

  return {
    errors,
    isValid: isEmpty(errors)
  };
};