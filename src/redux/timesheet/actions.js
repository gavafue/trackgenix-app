import {
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  GET_TIMESHEETS_PENDING,
  DELETE_TIMESHEET_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  SET_INFO_FOR_DELETE,
  SET_INFO_FOR_FEEDBACK,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE
} from './constants';
//ACTIONS FOR GET
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
//ACTIONS FOR DELETE
export const deleteTimesheetSuccess = (deleteInfo) => ({
  type: DELETE_TIMESHEET_SUCCESS,
  payload: deleteInfo
});

export const deleteTimesheetPending = () => ({
  type: DELETE_TIMESHEET_PENDING
});

export const deleteTimesheetError = (error) => ({
  type: DELETE_TIMESHEET_ERROR,
  payload: error
});
//ACTIONS FOR FEEDBACK AND DELETE MODALS
export const setInfoForFeedback = (message) => ({
  type: SET_INFO_FOR_FEEDBACK,
  payload: message
});

export const setInfoForDelete = (id) => ({
  type: SET_INFO_FOR_DELETE,
  payload: id
});

export const showDeleteMessage = (boolean) => ({
  type: SHOW_DELETE_MESSAGE,
  payload: boolean
});

export const showFeedbackMessage = (boolean) => ({
  type: SHOW_FEEDBACK_MESSAGE,
  payload: boolean
});
