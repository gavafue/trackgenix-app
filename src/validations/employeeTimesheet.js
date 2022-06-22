import Joi from 'joi';
const employeeTimesheetValidation = Joi.object({
  addHoursWorked: Joi.number().min(1).required()
});
export default employeeTimesheetValidation;
