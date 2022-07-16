import {
  GET_PROJECTS_PENDING,
  GET_PROJECTS_SUCCESS,
  GET_PROJECTS_ERROR,
  DELETE_PROJECT_ERROR,
  DELETE_PROJECT_PENDING,
  DELETE_PROJECT_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  GET_ID_FROM_ROW,
  SET_INFO_TO_SHOW,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_PROJECT_ERROR,
  POST_PROJECT_SUCCESS,
  POST_PROJECT_PENDING,
  EDIT_PROJECT_ERROR,
  EDIT_PROJECT_PENDING,
  EDIT_PROJECT_SUCCESS,
  GET_SELECTED_PROJECT,
  CLEAN_SELECTED_PROJECT,
  SHOW_INFO
} from './constants';

const initialState = {
  list: [],
  isPending: false,
  error: '',
  infoForFeedback: { title: '', description: '' },
  showDeleteMessage: false,
  idFromRow: '',
  showFeedbackMessage: false,
  projectSelected: {},
  infoToShow: '',
  infoMessageToShow: { title: '', description: '' },
  showInfo: false
};

export const projectsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_PROJECTS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_PROJECTS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    case GET_PROJECTS_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case DELETE_PROJECT_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_PROJECT_SUCCESS:
      return {
        ...state,
        list: state.list.filter((project) => project._id !== action.payload),
        isPending: false
      };
    case DELETE_PROJECT_ERROR:
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
    case GET_ID_FROM_ROW:
      return {
        ...state,
        idFromRow: action.payload
      };

    case SET_INFO_TO_SHOW:
      return {
        ...state,
        infoToShow: action.payload
      };
    case SHOW_INFO:
      return {
        ...state,
        showInfo: action.payload
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
        isPending: false
      };
    case POST_PROJECT_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false
      };
    case POST_PROJECT_PENDING:
      return {
        ...state,
        isPending: true
      };
    case EDIT_PROJECT_PENDING:
      return {
        ...state,
        isPending: true
      };
    case EDIT_PROJECT_SUCCESS:
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
    case EDIT_PROJECT_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case GET_SELECTED_PROJECT:
      return {
        ...state,
        projectSelected: action.payload
      };
    case CLEAN_SELECTED_PROJECT:
      return {
        ...state,
        projectSelected: {},
        isPending: false
      };
    default:
      return state;
  }
};
