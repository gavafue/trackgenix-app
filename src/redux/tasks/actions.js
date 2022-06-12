import {
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_PENDING,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  // SHOW_PRELOADER,
  POST_TASK_ERROR,
  POST_TASK_SUCCESS,
  SET_PROJECT_VALUE,
  SET_DAY_VALUE,
  SET_DESCRIPTION_VALUE,
  SET_HOURS_VALUE,
  SET_WEEK_VALUE
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

// export const showPreloader = (boolean) => ({
//   type: SHOW_PRELOADER,
//   payload: boolean
// });

export const postTaskError = (error) => ({
  type: POST_TASK_ERROR,
  payload: error
});

export const postTaskSuccess = (task) => ({
  type: POST_TASK_SUCCESS,
  payload: task
});

export const setProjectValue = (data) => ({
  type: SET_PROJECT_VALUE,
  payload: data
});

export const setWeekValue = (data) => ({
  type: SET_WEEK_VALUE,
  payload: data
});

export const setDayValue = (data) => ({
  type: SET_DAY_VALUE,
  payload: data
});

export const setDescriptionValue = (data) => ({
  type: SET_DESCRIPTION_VALUE,
  payload: data
});

export const setHoursValue = (data) => ({
  type: SET_HOURS_VALUE,
  payload: data
});
