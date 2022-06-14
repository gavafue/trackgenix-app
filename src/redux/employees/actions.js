import {
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_ERROR,
  GET_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  ADD_OR_EDIT_EMPLOYEE_ERROR,
  ADD_OR_EDIT_EMPLOYEE_PENDING,
  ADD_OR_EDIT_EMPLOYEE_SUCCESS
} from './constants';

export const getEmployeeSuccess = (employees) => ({
  type: GET_EMPLOYEE_SUCCESS,
  payload: employees
});

export const getEmployeePending = () => ({
  type: GET_EMPLOYEE_PENDING
});

export const getEmployeeError = (error) => ({
  type: GET_EMPLOYEE_ERROR,
  payload: error
});

export const deleteEmployeeSuccess = (deleteInfo) => ({
  type: DELETE_EMPLOYEE_SUCCESS,
  payload: deleteInfo
});

export const deleteEmployeePending = () => ({
  type: DELETE_EMPLOYEE_PENDING
});

export const deleteEmployeeError = (error) => ({
  type: DELETE_EMPLOYEE_ERROR,
  payload: error
});

export const setInfoForFeedback = (message) => ({
  type: SET_INFO_FOR_FEEDBACK,
  payload: message
});

export const setInfoForDelete = (id) => ({
  type: SET_INFO_FOR_DELETE,
  payload: id
});

export const showDeleteMessage = (showDeleteMessage) => ({
  type: SHOW_DELETE_MESSAGE,
  payload: showDeleteMessage
});

export const showFeedbackMessage = (showFeedbackMessage) => ({
  type: SHOW_FEEDBACK_MESSAGE,
  payload: showFeedbackMessage
});

export const addOrEditEmployeeSuccess = (employee) => ({
  type: ADD_OR_EDIT_EMPLOYEE_SUCCESS,
  payload: employee
});

export const addOrEditEmployeePending = () => ({
  type: ADD_OR_EDIT_EMPLOYEE_PENDING
});

export const addOrEditEmployeeError = (error) => ({
  type: ADD_OR_EDIT_EMPLOYEE_ERROR,
  payload: error
});
