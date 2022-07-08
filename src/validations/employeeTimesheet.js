import Joi from 'joi';
const employeeTimesheetValidation = Joi.object({
  addHoursWorked: Joi.number().min(1).required(),
  timesheetId: Joi.string(),
  timesheetName: Joi.string(),
  hoursWorked: Joi.number()
});
export default employeeTimesheetValidation;