import {
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASKS_PENDING,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS
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

export const deleteTaskSuccess = (taskId) => ({
  type: DELETE_TASK_SUCCESS,
  payload: taskId
});

export const deleteTaskPending = () => ({
  type: DELETE_TASK_PENDING
});

export const deleteTaskError = (error) => ({
  type: DELETE_TASK_ERROR,
  payload: error
});
