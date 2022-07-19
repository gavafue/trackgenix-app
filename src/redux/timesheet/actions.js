import {
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  GET_TIMESHEETS_PENDING,
  DELETE_TIMESHEET_ERROR,
  DELETE_TIMESHEET_SUCCESS,
  DELETE_TIMESHEET_PENDING,
  GET_ID_FROM_ROW,
  SET_INFO_FOR_FEEDBACK,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  ADD_TIMESHEET_ERROR,
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_ERROR,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_SUCCESS,
  SELECTED_TIMESHEET,
  CLEAN_SELECTED_TIMESHEET,
  ADD_HOURS_TIMESHEET_ERROR,
  ADD_HOURS_TIMESHEET_PENDING,
  ADD_HOURS_TIMESHEET_SUCCESS
} from './constants';
//ACTIONS FOR GET
export const getTimesheetsSuccess = (timesheet) => ({
  type: GET_TIMESHEETS_SUCCESS,
  payload: timesheet
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

export const setidFromRow = (id) => ({
  type: GET_ID_FROM_ROW,
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
//ACTIONS FOR POST
export const addTimesheetsSuccess = (timesheet) => ({
  type: ADD_TIMESHEET_SUCCESS,
  payload: timesheet
});

export const addTimesheetsPending = () => ({
  type: ADD_TIMESHEET_PENDING
});

export const addTimesheetsError = (error) => ({
  type: ADD_TIMESHEET_ERROR,
  payload: error
});
// ACTIONS FOR PUT
export const editTimesheetsSuccess = (timesheet) => ({
  type: EDIT_TIMESHEET_SUCCESS,
  payload: timesheet
});

export const editTimesheetsPending = () => ({
  type: EDIT_TIMESHEET_PENDING
});

export const editTimesheetsError = (error) => ({
  type: EDIT_TIMESHEET_ERROR,
  payload: error
});

//ACTIONS FOR GET A TIMESHEET
export const selectOneTimesheet = (timesheet) => ({
  type: SELECTED_TIMESHEET,
  payload: timesheet
});
//
export const cleanSelectedTimesheet = () => ({
  type: CLEAN_SELECTED_TIMESHEET
});

// ACTIONS FOR ADD HOURS TO A TIMESHEET
export const addHoursTimesheetSuccess = (timesheet) => ({
  type: ADD_HOURS_TIMESHEET_SUCCESS,
  payload: timesheet
});

export const addHoursTimesheetPending = () => ({
  type: ADD_HOURS_TIMESHEET_PENDING
});

export const addHoursTimesheetError = (error) => ({
  type: ADD_HOURS_TIMESHEET_ERROR,
  payload: error
});
