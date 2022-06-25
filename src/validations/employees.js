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
      'date.greater': 'You can not get than older',
      'date.less': 'Your birth date can not be tomorrow, you already born'
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
    .pattern(/^(?=.*[A-Za-z])(?=.*\d)[A-Za-z\d]{6,}$/)
    .message('Minimum is 6 non-special characters, 1 letter and 1 number')
    .required(),
  photo: Joi.string().required(),
  active: Joi.boolean().required()
});

export default employeesValidation;
