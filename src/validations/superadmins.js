import Joi from 'joi';

const superadminsValidation = Joi.object({
  firstName: Joi.string()
    .min(3)
    .max(40)
    .messages({
      'string.min': 'Invalid name, it must not contain less than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 40 letters'
    })
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(40)
    .messages({
      'string.min': 'Invalid name, it must not contain less than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 40 letters'
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .messages({
      'string.email': 'Invalid email format. Try again.'
    })
    .required(),
  password: Joi.string()
    .min(8)
    .max(20)
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .messages({
      'string.min': 'Invalid password, it must contain at least 8 characters',
      'string.max': 'Invalid password, it must not contain more than 20 characters',
      'string.pattern.base': 'Invalid password, it must contain both letters and numbers'
    })
    .required(),
  role: Joi.string().uppercase().valid('SA').required(),
  active: Joi.boolean().required()
});

export default superadminsValidation;
