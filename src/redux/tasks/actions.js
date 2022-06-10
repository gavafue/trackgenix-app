import { GET_TASKS_SUCCESS, GET_TASKS_ERROR, GET_TASKS_PENDING } from './constants';

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
