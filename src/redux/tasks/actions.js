import {
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_PENDING,
  GET_SELECTED_ITEM,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  GET_ID_FROM_ROW,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_TASK_ERROR,
  POST_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  EDIT_TASK_SUCCESS,
  CLEAN_SELECTED_ITEM
} from './constants';

export const getTasksSuccess = (tasks) => ({
  type: GET_TASKS_SUCCESS,
  payload: tasks
});

export const getTasksPending = () => ({
  type: GET_TASKS_PENDING
});

export const getTasksError = (error) => ({
  type: GET_TASKS_ERROR,
  payload: error
});

export const getSelectedItem = (task) => {
  return {
    type: GET_SELECTED_ITEM,
    payload: task
  };
};

export const deleteTaskSuccess = (deleteInfo) => ({
  type: DELETE_TASK_SUCCESS,
  payload: deleteInfo
});

export const deleteTaskPending = () => ({
  type: DELETE_TASK_PENDING
});

export const deleteTaskError = (error) => ({
  type: DELETE_TASK_ERROR,
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

export const postTaskError = (error) => ({
  type: POST_TASK_ERROR,
  payload: error
});

export const postTaskSuccess = (task) => ({
  type: POST_TASK_SUCCESS,
  payload: task
});

export const editTaskSuccess = (taskEdited) => ({
  type: EDIT_TASK_SUCCESS,
  payload: taskEdited
});

export const editTaskError = (error) => ({
  type: EDIT_TASK_ERROR,
  payload: error
});

export const cleanSelectedItem = () => ({
  type: CLEAN_SELECTED_ITEM
});
