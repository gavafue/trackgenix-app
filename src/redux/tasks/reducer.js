import { GET_TASKS_PENDING, GET_TASKS_SUCCESS, GET_TASKS_ERROR } from './constants';

const initialState = {
  list: [],
  pending: false,
  error: ''
};

export const tasksReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TASKS_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    default:
      return state;
  }
};
