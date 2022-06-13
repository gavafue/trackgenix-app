import {
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_PENDING,
  DELETE_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_SUPERADMIN_ERROR,
  POST_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_ERROR,
  EDIT_SUPERADMIN_SUCCESS
} from './constants';

export const getSuperAdminsSuccess = (superAdmins) => ({
  type: GET_SUPERADMINS_SUCCESS,
  payload: superAdmins
});

export const getSuperAdminsPending = () => ({
  type: GET_SUPERADMINS_PENDING
});

export const getSuperAdminsError = (error) => ({
  type: GET_SUPERADMINS_ERROR,
  payload: error
});

export const deleteSuperAdminSuccess = (deleteInfo) => ({
  type: DELETE_SUPERADMIN_SUCCESS,
  payload: deleteInfo
});

export const deleteSuperAdminPending = () => ({
  type: DELETE_SUPERADMIN_PENDING
});

export const deleteSuperAdminError = (error) => ({
  type: DELETE_SUPERADMIN_ERROR,
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

export const postSuperAdminError = (error) => ({
  type: POST_SUPERADMIN_ERROR,
  payload: error
});

export const postSuperAdminSuccess = (superadmin) => ({
  type: POST_SUPERADMIN_SUCCESS,
  payload: superadmin
});

export const editSuperAdminSuccess = (superadminEdited) => ({
  type: EDIT_SUPERADMIN_SUCCESS,
  payload: superadminEdited
});

export const editSuperAdminError = (error) => ({
  type: EDIT_SUPERADMIN_ERROR,
  payload: error
});
