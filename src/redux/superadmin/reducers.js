import {
  GET_SUPERADMINS_PENDING,
  GET_SUPERADMINS_SUCCESS,
  GET_SUPERADMINS_ERROR,
  DELETE_SUPERADMIN_ERROR,
  DELETE_SUPERADMIN_PENDING,
  DELETE_SUPERADMIN_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  GET_ID_FROM_ROW,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  POST_SUPERADMIN_ERROR,
  POST_SUPERADMIN_PENDING,
  POST_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_SUCCESS,
  EDIT_SUPERADMIN_PENDING,
  EDIT_SUPERADMIN_ERROR,
  CLEAN_SELECTED_SUPERADMIN,
  GET_SELECTED_SUPERADMIN
} from './constants';

const initialState = {
  list: [],
  isPending: false,
  error: '',
  infoForFeedback: { title: '', description: '' },
  showDeleteMessage: false,
  idFromRow: '',
  showFeedbackMessage: false,
  selectedSuperadmin: {}
};

export const superadminReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_SUPERADMINS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_SUPERADMINS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    case GET_SUPERADMINS_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case DELETE_SUPERADMIN_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.filter((superadmin) => superadmin._id !== action.payload),
        isPending: false
      };
    case DELETE_SUPERADMIN_ERROR:
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
    case POST_SUPERADMIN_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case POST_SUPERADMIN_PENDING:
      return {
        ...state,
        isPending: true
      };
    case POST_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false
      };
    case EDIT_SUPERADMIN_SUCCESS:
      return {
        ...state,
        list: state.list.map((superadmin) => {
          if (superadmin._id === action.payload._id) {
            return action.payload;
          }
          return superadmin;
        }),
        isPending: false
      };
    case EDIT_SUPERADMIN_PENDING:
      return {
        ...state,
        isPending: true
      };
    case EDIT_SUPERADMIN_ERROR:
      return {
        ...state,
        error: true,
        isPending: false
      };
    case CLEAN_SELECTED_SUPERADMIN:
      return {
        ...state,
        selectedSuperadmin: {},
        isPending: false
      };
    case GET_SELECTED_SUPERADMIN:
      return {
        ...state,
        selectedSuperadmin: action.payload
      };
    default:
      return state;
  }
};
