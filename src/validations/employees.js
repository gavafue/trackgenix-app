import Joi from 'joi';

const employeesValidation = Joi.object({
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
      'string.min': 'Invalid last name, it must not contain less than 3 letters',
      'string.max': 'Invalid last name, it must not contain more than 40 letters'
    })
    .required(),
  birthDate: Joi.date()
    .greater('1900-1-1')
    .less(new Date())
    .messages({
      'date.greater': 'Invalid date',
      'date.less': 'Invalid date, must be before current date'
    })
    .required(),
  country: Joi.string()
    .min(3)
    .max(60)
    .messages({
      'string.min': 'Invalid country, it must not contain less than 3 letters',
      'string.max': 'Invalid country, it must not contain more than 60 letters'
    })
    .required(),
  city: Joi.string()
    .min(3)
    .max(60)
    .messages({
      'string.min': 'Invalid city, it must not contain less than 3 letters',
      'string.max': 'Invalid city, it must not contain more than 60 letters'
    })
    .required(),
  zip: Joi.number()
    .integer()
    .min(1000)
    .max(99999)
    .messages({
      'string.min': 'Invalid zip, it must not contain less than 4 numbers',
      'string.max': 'Invalid zip, it must not contain more than 5 numbers'
    })
    .required(),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .message('Invalid phone. Phone number should be a 10 digits value')
    .required(),
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .lowercase()
    .messages({
      'string.email': 'Invalid email format. Try again.'
    })
    .required(),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .messages({
      'string.min': 'Invalid password, it must contain at least 8 characters',
      'string.pattern.base': 'Invalid password, it must contain both letters and numbers'
    })
    .required(),
  photo: Joi.string().required(),
  active: Joi.boolean().required()
});

export default employeesValidation;
