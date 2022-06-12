import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_PROJECT_ERROR,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_PENDING
} from './constants';

const initialState = {
  list: [],
  pending: false,
  error: '',
  infoForFeedback: { title: '', description: '' },
  showDeleteMessage: false,
  infoForDelete: '',
  showFeedbackMessage: false
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case DELETE_PROJECT_PENDING:
      return {
        ...state,
        pending: true
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((project) => project._id !== action.payload),
        pending: false
      };
    case DELETE_PROJECT_ERROR:
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
    case POST_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case POST_PROJECT_SUCCESS:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case POST_PROJECT_PENDING:
      return {
        ...state,
        pending: true
      };
    default:
      return state;
  }
};
