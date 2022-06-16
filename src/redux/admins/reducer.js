import {
  GET_ADMINS_PENDING,
  GET_ADMINS_SUCCESS,
  GET_ADMINS_ERROR,
  DELETE_ADMIN_ERROR,
  DELETE_ADMIN_PENDING,
  DELETE_ADMIN_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_ADMIN_ERROR,
  POST_ADMIN_SUCCESS,
  POST_ADMIN_PENDING,
  GET_SELECTED_ADMIN,
  EDIT_ADMIN_PENDING,
  EDIT_ADMIN_ERROR,
  EDIT_ADMIN_SUCCESS,
  CLEAN_SELECTED_ADMIN
} from './constants';

const initialState = {
  list: [],
  pending: false,
  error: '',
  infoForFeedback: { title: '', description: '' },
  showDeleteMessage: false,
  infoForDelete: '',
  showFeedbackMessage: false,
  adminSelected: {}
};

export const adminsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_ADMINS_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_ADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case GET_ADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case DELETE_ADMIN_PENDING:
      return {
        ...state,
        pending: true
      };
    case DELETE_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((admin) => admin._id !== action.payload),
        pending: false
      };
    case DELETE_ADMIN_ERROR:
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
    case POST_ADMIN_PENDING:
      return {
        ...state,
        pending: true
      };
    case POST_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case POST_ADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        pending: false
      };
    case EDIT_ADMIN_PENDING:
      return {
        ...state,
        pending: true
      };
    case EDIT_ADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.map((admin) => {
          if (admin._id === action.payload._id) {
            return action.payload;
          }
          return admin;
        }),
        pending: false
      };
    case EDIT_ADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case GET_SELECTED_ADMIN:
      return {
        ...state,
        adminSelected: action.payload,
        pending: false
      };
    case CLEAN_SELECTED_ADMIN:
      return {
        ...state,
        adminSelected: {},
        pending: false
      };
    default:
      return state;
  }
};
