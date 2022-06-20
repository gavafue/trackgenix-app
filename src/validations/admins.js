import Joi from 'joi';

const adminsValidation = Joi.object({
  name: Joi.string()
    .min(3)
    .max(50)
    .messages({
      'string.min': 'Invalid name, it must not contain less than 3 letters',
      'string.max': 'Invalid name, it must not contain more than 50 letters'
    })
    .required(),
  lastName: Joi.string()
    .min(3)
    .max(50)
    .messages({
      'string.min': 'Invalid last name, it must not contain less than 3 letters',
      'string.max': 'Invalid last name, it must not contain more than 50 letters'
    })
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .message('Invalid email format')
    .required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .messages({
      'string.min': 'Invalid password, it must contain at least 8 characters',
      'string.pattern.base': 'Invalid password, it must contain both letters and numbers'
    })
    .required(),
  gender: Joi.string()
    .lowercase()
    .valid('female', 'male', 'other')
    .messages({ 'any.only': 'Invalid gender, it must be one of "Female", "Male" or "Other"' })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .message('Invalid phone. Phone number should be a 10 digits value')
    .required(),
  dateBirth: Joi.date()
    .less('now')
    .message('Invalid date, it must be before the current date')
    .required(),
  city: Joi.string()
    .min(3)
    .message('Invalid city name, it must contain at least 3 letters')
    .required(),
  zip: Joi.string()
    .min(4)
    .max(5)
    .messages({
      'string.min': 'Invalid zip number, it must not contain less than 4 digits',
      'string.max': 'Invalid zip number, it must not contain more than 5 digits',
      'string.base': 'Invalid zip number, it must be a string'
    })
    .required(),
  active: Joi.boolean()
    .messages({ 'boolean.base': 'Invalid active value, it must be a boolean' })
    .required()
});

export default adminsValidation;
