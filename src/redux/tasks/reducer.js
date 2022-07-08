import {
  GET_TASKS_PENDING,
  GET_TASKS_SUCCESS,
  GET_TASKS_ERROR,
  DELETE_TASK_ERROR,
  DELETE_TASK_PENDING,
  DELETE_TASK_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_TASK_PENDING,
  POST_TASK_SUCCESS,
  POST_TASK_ERROR,
  EDIT_TASK_PENDING,
  EDIT_TASK_SUCCESS,
  EDIT_TASK_ERROR,
  GET_SELECTED_ITEM,
  CLEAN_SELECTED_ITEM
} from './constants';

const initialState = {
  list: [],
  isPending: false,
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
        isPending: true
      };
    case GET_TASKS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    case GET_TASKS_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case DELETE_TASK_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.filter((task) => task._id !== action.payload),
        isPending: false
      };
    case DELETE_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
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
    case POST_TASK_PENDING:
      return {
        ...state,
        isPending: true
      };
    case POST_TASK_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false
      };
    case POST_TASK_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case EDIT_TASK_PENDING:
      return {
        ...state,
        isPending: true
      };
    case EDIT_TASK_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
        isPending: false
      };
    case EDIT_TASK_ERROR:
      return {
        ...state,
        error: true,
        isPending: false
      };
    case GET_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: action.payload
      };
    case CLEAN_SELECTED_ITEM:
      return {
        ...state,
        selectedItem: {},
        isPending: false
      };
    default:
      return state;
  }
};
