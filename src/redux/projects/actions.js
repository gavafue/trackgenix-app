import {
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  GET_PROJECTS_PENDING,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_PROJECT_ERROR,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_PENDING,
  EDIT_PROJECT_ERROR,
  EDIT_PROJECT_PENDING,
  EDIT_PROJECT_SUCCESS,
  GET_SELECTED_PROJECT
} from './constants';

export const getProjectsSuccess = (tasks) => ({
  type: GET_PROJECTS_SUCCESS,
  payload: tasks
});

export const getProjectsPending = () => ({
  type: GET_PROJECTS_PENDING
});

export const getProjectsError = (error) => ({
  type: GET_PROJECTS_ERROR,
  payload: error
});

export const deleteProjectSuccess = (deleteInfo) => ({
  type: DELETE_PROJECT_SUCCESS,
  payload: deleteInfo
});

export const deleteProjectPending = () => ({
  type: DELETE_PROJECT_PENDING
});

export const deleteProjectError = (error) => ({
  type: DELETE_PROJECT_ERROR,
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

export const postProjectError = (error) => ({
  type: POST_PROJECT_ERROR,
  payload: error
});

export const postProjectSuccess = (task) => ({
  type: POST_PROJECT_SUCCESS,
  payload: task
});

export const postProjectPending = () => ({
  type: POST_PROJECT_PENDING
});

export const editProjectSuccess = (projectEdited) => ({
  type: EDIT_PROJECT_SUCCESS,
  payload: projectEdited
});

export const editProjectError = (error) => ({
  type: EDIT_PROJECT_ERROR,
  payload: error
});

export const editProjectPending = () => ({
  type: EDIT_PROJECT_PENDING
});

export const getSelectedProject = (project) => ({
  type: GET_SELECTED_PROJECT,
  payload: project
});
