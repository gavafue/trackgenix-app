import Joi from 'joi';

const membersJoiSch = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().uppercase().valid('DEV', 'QA', 'TL').required(),
  rate: Joi.number()
    .min(10)
    .max(2000)
    .messages({
      'number.min': 'Rate must be at least 10',
      'number.max': 'Rate must not be greater than 2000'
    })
    .required()
});

const projectsValidation = Joi.object({
  members: Joi.array().items(membersJoiSch).required(),
  name: Joi.string()
    .min(3)
    .max(30)
    .messages({
      'string.min': 'Project name must be at least 3 characters long',
      'string.max': 'Project name cannot be longer than 30 characters'
    })
    .required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')),
  description: Joi.string()
    .min(10)
    .max(500)
    .messages({
      'string.min': 'Description must be at least 10 characters long',
      'string.max': 'Description cannot be longer than 500 characters'
    })
    .required(),
  active: Joi.boolean().required(),
  client: Joi.string()
    .min(3)
    .max(40)
    .messages({
      'string.min': 'Invalid name, it must not contain less than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 40 letters'
    })
    .required(),
  pm: Joi.string().required()
});

export default projectsValidation;
