import Joi from 'joi';

const loginValidation = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message('Invalid email format')
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
    .required()
});

export default loginValidation;
