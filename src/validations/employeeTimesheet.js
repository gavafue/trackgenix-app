import Joi from 'joi';
const employeeTimesheetValidation = Joi.object({
  addHoursWorked: Joi.number()
    .min(1)
    .max(100)
    .messages({
      'number.min': 'Must add at least 1 hour to submit',
      'number.max': 'Cannot add more than 100 hours'
    })
    .required(),
  timesheetId: Joi.string(),
  timesheetName: Joi.string(),
  hoursWorked: Joi.number()
});
export default employeeTimesheetValidation;
