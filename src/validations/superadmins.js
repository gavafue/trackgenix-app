import Joi from 'joi';

const superadminsValidation = Joi.object({
  firstName: Joi.string().min(3).max(50).required(),
  lastName: Joi.string().min(3).max(50).required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .message('Invalid password, it must contain letters and numbers')
    .required(),
  role: Joi.string().uppercase().valid('SA').required(),
  active: Joi.boolean().required()
});

export default superadminsValidation;