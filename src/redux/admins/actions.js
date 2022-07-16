import {
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMINS_PENDING,
  DELETE_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  GET_ID_FROM_ROW,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_ERROR,
  GET_SELECTED_ADMIN,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_SUCCESS,
  EDIT_ADMIN_ERROR,
  CLEAN_SELECTED_ADMIN,
  EDIT_ADMIN_STATUS_ERROR,
  EDIT_ADMIN_STATUS_SUCCESS,
  EDIT_ADMIN_STATUS_PENDING
} from './constants';

export const getAdminsSuccess = (admins) => ({
  type: GET_ADMINS_SUCCESS,
  payload: admins
});

export const getAdminsPending = () => ({
  type: GET_ADMINS_PENDING
});

export const getAdminsError = (error) => ({
  type: GET_ADMINS_ERROR,
  payload: error
});

export const deleteAdminSuccess = (deleteInfo) => ({
  type: DELETE_ADMIN_SUCCESS,
  payload: deleteInfo
});

export const deleteAdminPending = () => ({
  type: DELETE_ADMIN_PENDING
});

export const deleteAdminError = (error) => ({
  type: DELETE_ADMIN_ERROR,
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

export const postAdminError = (error) => ({
  type: POST_ADMIN_ERROR,
  payload: error
});

export const postAdminSuccess = (admin) => ({
  type: POST_ADMIN_SUCCESS,
  payload: admin
});

export const postAdminPending = () => ({
  type: POST_ADMIN_PENDING
});

export const getSelectedAdmin = (admin) => ({
  type: GET_SELECTED_ADMIN,
  payload: admin
});

export const editAdminPending = () => ({
  type: EDIT_ADMIN_PENDING
});

export const editAdminSuccess = (adminEdited) => ({
  type: EDIT_ADMIN_SUCCESS,
  payload: adminEdited
});

export const editAdminError = (error) => ({
  type: EDIT_ADMIN_ERROR,
  payload: error
});

export const cleanSelectedAdmin = () => ({
  type: CLEAN_SELECTED_ADMIN
});

export const editAdminStatusPending = () => ({
  type: EDIT_ADMIN_STATUS_PENDING
});

export const editAdminStatusSuccess = (adminEdited) => ({
  type: EDIT_ADMIN_STATUS_SUCCESS,
  payload: adminEdited
});

export const editAdminStatusError = (error) => ({
  type: EDIT_ADMIN_STATUS_ERROR,
  payload: error
});
