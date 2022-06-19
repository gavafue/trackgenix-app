import Joi from 'joi';

const membersJoiSch = Joi.object({
  name: Joi.string().required(),
  role: Joi.string().uppercase().valid('DEV', 'QA', 'PM', 'TL').required(),
  rate: Joi.number().required()
});

const validations = Joi.object({
  firstName: Joi.string()
    .min(2)
    .max(40)
    .uppercase(0)
    .lowercase()
    .message('First name should contain at least 2 charcters and at most 40'),
  lastName: Joi.string()
    .min(2)
    .max(40)
    .uppercase()
    .message('Last name should contain at least 2 charcters and at most 40'),
  email: Joi.string()
    .regex(/^\w+([.-]?\w+)@\w+([.-]?\w+)(.\w{2,3})+$/)
    .lowercase()
    .message('Invalid email format'),
  password: Joi.string()
    .min(8)
    .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
    .message('Password should be at least 8 characters long and contain letters and numbers'),
  phone: Joi.string()
    .regex(/^[0-9]{10}$/)
    .message('Phone number should be a 10 digits value'),
  anyDate: Joi.date().greater('1900-1-1').message('Invalid date'),
  birthDate: Joi.date().greater('1900-1-1').less(new Date()).message('Invalid date'),
  startDate: Joi.date().greater('1900-1-1').message('Invalid date'),
  endDate: Joi.date().greater(Joi.ref('startDate')).message('Invalid date'),
  country: Joi.string()
    .min(4)
    .uppercase(0)
    .lowercase()
    .message('Country name should contain at least 4 charcters'),
  city: Joi.string()
    .min(1)
    .uppercase(0)
    .lowercase()
    .message('City name should contain at least 1 charcters'),
  zip: Joi.string()
    .regex(/^[0-9]{4,5}$/)
    .message('Postal code should be a 4 or 5 digits value'),
  photo: Joi.string().min(0).message('Invalid photo'),
  description: Joi.string().min(6).message('Description should contain at least 6 charcters'),
  client: Joi.string()
    .min(3)
    .uppercase(0)
    .lowercase()
    .message('Client should contain at least 3 charcters'),
  week: Joi.number().min(0).message('Week should be a number'),
  day: Joi.number().min(0).message('Day should be a number'),
  hours: Joi.number().min(0).message('Hours should be a number'),
  members: Joi.array().items(membersJoiSch),
  project: Joi.string().min(0).message('Invalid project'),
  gender: Joi.string().lowercase().valid('female', 'male', 'other'),
  active: Joi.boolean().sensitive()
});

export default validations;
