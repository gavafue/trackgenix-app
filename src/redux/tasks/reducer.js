import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  GET_TASK_BY_ID_PENDING,
  GET_TASK_BY_ID_SUCCESS,
  GET_TASK_BY_ID_ERROR,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_TASK_ERROR,
  POST_TASK_SUCCESS,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR
} from './constants';

const initialState = {
  list: [],
  pending: false,
  error: '',
  infoForFeedback: { title: '', description: '' },
  showDeleteMessage: false,
  infoForDelete: '',
  showFeedbackMessage: false,
  selectedItem: {}
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
    case GET_TASK_BY_ID_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_TASK_BY_ID_SUCCESS:
      return {
        ...state,
        isFetching: false,
        selectedItem: action.payload
      };
    case GET_TASK_BY_ID_ERROR:
      return {
        ...state,
        isFetching: false,
        error: action.payload
      };
    case DELETE_TASK_PENDING:
      return {
        ...state,
        pending: true
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.filter((task) => task._id !== action.payload),
        pending: false
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case SET_INFO_FOR_FEEDBACK:
      return {
        ...state,
        infoForFeedback: action.payload
      };
    case SET_INFO_FOR_DELETE:
      return {
        ...state,
        infoForDelete: action.payload
      };
    case SHOW_DELETE_MESSAGE:
      return {
        ...state,
        showDeleteMessage: action.payload
      };
    case SHOW_FEEDBACK_MESSAGE:
      return {
        ...state,
        showFeedbackMessage: action.payload
      };

    case POST_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case POST_TASK_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        selectedItem: action.payload,
        pending: false
      };
    case EDIT_TASK_ERROR:
      return {
        ...state,
        error: true,
        pending: false
      };
    default:
      return state;
  }
};
