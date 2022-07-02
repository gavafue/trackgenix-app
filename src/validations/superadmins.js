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
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .message('Invalid password, it must contain letters and numbers')
    .required(),
  role: Joi.string().uppercase().valid('SA').required(),
  active: Joi.boolean().required()
});

export default superadminsValidation;
