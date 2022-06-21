import Joi from 'joi';

const tasksValidation = Joi.object({
  nameProject: Joi.string().required(),
  week: Joi.number().required(),
  day: Joi.number().required(),
  description: Joi.string().required(),
  hours: Joi.number().required()
});

export default tasksValidation;
