import Joi from 'joi';

const timesheetsValidation = Joi.object({
  project: Joi.string().required(),
  employee: Joi.string().required(),
  weekSprint: Joi.number().min(2).message('Minimum week sprint must be 2 weeks').required(),
  date: Joi.date().required(),
  hoursWorked: Joi.number()
    .min(1)
    .message('Must add at least one hour in order to submit')
    .required(),
  hoursProject: Joi.number()
    .min(1)
    .message('Must add at least one hour in order to submit')
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
