import Joi from 'joi';

const timesheetsValidation = Joi.object({
  project: Joi.string().required(),
  employee: Joi.string().required(),
  weekSprint: Joi.number()
    .min(2)
    .max(6)
    .messages({
      'number.min': 'Sprint must be at least 2 weeks long',
      'number.max': 'Sprint cannot be more than 6 weeks long'
    })
    .required(),
  date: Joi.date().required(),
  hoursWorked: Joi.number()
    .min(1)
    .max(100)
    .messages({
      'number.min': 'Must add at least 1 hour to submit',
      'number.max': 'Cannot add more than 100 hours'
    })
    .required(),
  hoursProject: Joi.number()
    .min(1)
    .max(1000)
    .messages({
      'number.min': 'Must add at least 1 hour to submit',
      'number.max': 'Cannot add more than 1000 hours'
    })
    .required(),
  workDescription: Joi.string()
    .min(10)
    .max(500)
    .messages({
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot be longer than 500 characters'
    })
    .required()
});

export default timesheetsValidation;
