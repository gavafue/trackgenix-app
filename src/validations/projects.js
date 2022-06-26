import Joi from 'joi';

const membersJoiSch = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().uppercase().valid('DEV', 'QA', 'PM', 'TL').required(),
  rate: Joi.number().integer().min(0).required()
});

const projectsValidation = Joi.object({
  members: Joi.array().items(membersJoiSch).required(),
  name: Joi.string().min(3).message('Project name should be at least 3 characters long').required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')),
  description: Joi.string()
    .min(6)
    .message('Description should be at least 6 characters long')
    .required(),
  active: Joi.boolean().required(),
  client: Joi.string().min(3).message('Client name should be at least 3 characters long').required()
});

export default projectsValidation;
