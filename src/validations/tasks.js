import Joi from 'joi';

const tasksValidation = Joi.object({
  nameProject: Joi.string().required(),
  week: Joi.number()
    .min(1)
    .max(14)
    .messages({
      'number.min': 'Must add at least one week in order to submit',
      'number.max': 'Cannot add more than 14 weeks'
    })
    .required(),
  day: Joi.number()
    .min(1)
    .max(100)
    .messages({
      'number.min': 'Must add at least one day in order to submit',
      'number.max': 'Cannot add more than 100 days'
    })
    .required(),
  description: Joi.string()
    .min(10)
    .max(300)
    .messages({
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot be longer than 300 characters'
    })
    .required(),
  hours: Joi.number()
    .min(1)
    .max(100)
    .messages({
      'number.min': 'Must add at least 1 hour to submit',
      'number.max': 'Cannot add more than 100 hours'
    })
    .required()
});

export default tasksValidation;
