import {
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  GET_ADMINS_PENDING,
  DELETE_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_ADMIN_PENDING,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_ERROR
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
