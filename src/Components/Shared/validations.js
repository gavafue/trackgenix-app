import Joi from "joi";

const membersJoiSch = Joi.object({
    name: Joi.string().required(),
    role: Joi.string().uppercase().valid('DEV', 'QA', 'PM', 'TL').required(),
    rate: Joi.number().required(),
});

const validations = Joi.object({
    firstName: Joi.string().min(2).max(40).uppercase(0).lowercase()
        .message('First name should contain at least 2 charcters and at most 40')
        .required(),
    lastName: Joi.string().min(2).max(40).uppercase()
        .message('Last name should contain at least 2 charcters and at most 40')
        .required(),
    email: Joi.string().email().lowercase()
        .message('Invalid email format')
        .required(),
    password: Joi.string()
        .min(8)
        .regex(/^(?=.*?[a-zA-Z])(?=.*?[0-9])/)
        .message('Password should be at least 8 characters long and contain letters and numbers')
        .required(),
    phone: Joi.string().regex(/^[0-9]{10}$/)
        .message('Phone number should be a 10 digits value')
        .required(),
    dateBirth: Joi.date().greater('1-1-1900').less(new Date())
        .message('Invalid date')
        .required(),
    startDate: Joi.date().greater('1-1-1900')
        .message('Invalid date')
        .required(),
    endDate: Joi.date().greater(Joi.ref('startDate'))
        .message('Invalid date')
        .required(),
    country: Joi.string().min(4).uppercase(0).lowercase()
        .message('Country name should contain at least 4 charcters')
        .required(),
    city: Joi.string().min(1).uppercase(0).lowercase()
        .message('City name should contain at least 1 charcters')
        .required(),
    zip: Joi.string().regex(/^[0-9]{4,5}$/)
        .message('Postal code should be a 4 or 5 digits value')
        .required(),
    photo: Joi.string()
        .message('Invalid photo')
        .required(),
    description: Joi.string().min(6)
        .message('Description should contain at least 6 charcters')
        .required(),
    client: Joi.string().min(3).uppercase(0).lowercase()
        .message('Client should contain at least 3 charcters')
        .required(),
    week: Joi.number().min(0)
        .message('Week should be a number')
        .required(),
    day: Joi.number().min(0)
        .message('Day should be a number')
        .required(),
    hours: Joi.number().min(0)
        .message('Hours should be a number')
        .required(),
    members: Joi.array().items(membersJoiSch)
        .message('Invalid member')
        .required(),
    project: Joi.string()
        .message('Invalid project')
        .required(),
    gender: Joi.string().lowercase().valid('female', 'male', 'other')
        .message('Check the gender entered')
        .required(),
    active: Joi.boolean()
        .message('Invalid status')
        .required(),
});

export default validations;
