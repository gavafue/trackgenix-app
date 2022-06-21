import Joi from 'joi';

const membersJoiSch = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().uppercase().valid('DEV', 'QA', 'PM', 'TL').required(),
  rate: Joi.number().required()
});

const projectsValidation = Joi.object({
  members: Joi.array().items(membersJoiSch).required(),
  name: Joi.string().min(3).required(),
  startDate: Joi.date().required(),
  endDate: Joi.date().greater(Joi.ref('startDate')),
  description: Joi.string().min(6).required(),
  active: Joi.boolean().required(),
  client: Joi.string().min(3).required()
});

export default projectsValidation;
