import {
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_ERROR,
  GET_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  GET_ID_FROM_ROW,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_EMPLOYEE_ERROR,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_PENDING,
  EDIT_EMPLOYEE_ERROR,
  EDIT_EMPLOYEE_PENDING,
  EDIT_EMPLOYEE_SUCCESS,
  GET_SELECTED_EMPLOYEE,
  CLEAN_SELECTED_EMPLOYEE,
  GET_EMPLOYEE_BY_ID_ERROR,
  GET_EMPLOYEE_BY_ID_PENDING,
  GET_EMPLOYEE_BY_ID_SUCCESS
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

export const getIdFromRow = (id) => ({
  type: GET_ID_FROM_ROW,
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

export const postEmployeeError = (error) => ({
  type: POST_EMPLOYEE_ERROR,
  payload: error
});

export const postEmployeeSuccess = (employee) => ({
  type: POST_EMPLOYEE_SUCCESS,
  payload: employee
});

export const postEmployeePending = () => ({
  type: POST_EMPLOYEE_PENDING
});

export const editEmployeeSuccess = (employeeEdited) => ({
  type: EDIT_EMPLOYEE_SUCCESS,
  payload: employeeEdited
});

export const editEmployeeError = (error) => ({
  type: EDIT_EMPLOYEE_ERROR,
  payload: error
});

export const editEmployeePending = () => ({
  type: EDIT_EMPLOYEE_PENDING
});

export const getSelectedEmployee = (employee) => ({
  type: GET_SELECTED_EMPLOYEE,
  payload: employee
});

export const cleanSelectedEmployee = () => ({
  type: CLEAN_SELECTED_EMPLOYEE
});

export const getEmployeeByIdPending = () => {
  return {
    type: GET_EMPLOYEE_BY_ID_PENDING
  };
};

export const getEmployeeByIdSuccess = (employee) => {
  return {
    type: GET_EMPLOYEE_BY_ID_SUCCESS,
    payload: employee
  };
};

export const getEmployeeByIdError = (error) => {
  return {
    type: GET_EMPLOYEE_BY_ID_ERROR,
    payload: error
  };
};
