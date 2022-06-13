import {
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_PENDING,
  GET_TASK_BY_ID_ERROR,
  GET_TASK_BY_ID_PENDING,
  GET_TASK_BY_ID_SUCCESS,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_TASK_ERROR,
  POST_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  EDIT_TASK_SUCCESS
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

export const getTaskByIdPending = () => {
  return {
    type: GET_TASK_BY_ID_PENDING
  };
};

export const getTaskByIdSuccess = (task) => {
  return {
    type: GET_TASK_BY_ID_SUCCESS,
    payload: task
  };
};

export const getTaskByIdError = (error) => {
  return {
    type: GET_TASK_BY_ID_ERROR,
    payload: error
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
