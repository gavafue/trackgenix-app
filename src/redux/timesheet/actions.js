import { GET_TIMESHEETS_SUCCESS, GET_TIMESHEETS_ERROR, GET_TIMESHEETS_PENDING } from './constants';

export const getTimesheetsSuccess = (tasks) => ({
  type: GET_TIMESHEETS_SUCCESS,
  payload: tasks
});

export const getTimesheetsPending = () => ({
  type: GET_TIMESHEETS_PENDING
});

export const getTimesheetsError = (error) => ({
  type: GET_TIMESHEETS_ERROR,
  payload: error
});
