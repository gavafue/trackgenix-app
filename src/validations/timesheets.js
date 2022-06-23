import Joi from 'joi';

const timesheetsValidation = Joi.object({
  project: Joi.string().required(),
  employee: Joi.string().required(),
  weekSprint: Joi.number().min(2).required(),
  date: Joi.date().required(),
  hoursWorked: Joi.number().required(),
  hoursProject: Joi.number().required(),
  workDescription: Joi.string().min(5).max(2000).required()
});

export default timesheetsValidation;
