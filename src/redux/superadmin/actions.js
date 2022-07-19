import {
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  GET_SUPERADMINS_PENDING,
  DELETE_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  GET_ID_FROM_ROW,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_SUPERADMIN_ERROR,
  POST_SUPERADMIN_SUCCESS,
  POST_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_ERROR,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_SUCCESS,
  GET_SELECTED_SUPERADMIN,
  CLEAN_SELECTED_SUPERADMIN
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

export const setidFromRow = (id) => ({
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

export const postSuperAdminError = (error) => ({
  type: POST_SUPERADMIN_ERROR,
  payload: error
});

export const postSuperAdminsPending = () => ({
  type: POST_SUPERADMIN_PENDING
});

export const postSuperAdminSuccess = (superadmin) => ({
  type: POST_SUPERADMIN_SUCCESS,
  payload: superadmin
});

export const editSuperAdminSuccess = (superadminEdited) => ({
  type: EDIT_SUPERADMIN_SUCCESS,
  payload: superadminEdited
});

export const editSuperAdminsPending = () => ({
  type: EDIT_SUPERADMIN_PENDING
});

export const editSuperAdminError = (error) => ({
  type: EDIT_SUPERADMIN_ERROR,
  payload: error
});

export const getSelectedSuperadmin = (superadmin) => {
  return {
    type: GET_SELECTED_SUPERADMIN,
    payload: superadmin
  };
};

export const cleanSelectedSuperadmin = (superAdmin) => ({
  type: CLEAN_SELECTED_SUPERADMIN,
  payload: superAdmin
});
