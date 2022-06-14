import {
  GET_EMPLOYEE_PENDING,
  GET_EMPLOYEE_SUCCESS,
  GET_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_ERROR,
  DELETE_EMPLOYEE_PENDING,
  DELETE_EMPLOYEE_SUCCESS,
  SET_INFO_FOR_FEEDBACK,
  SET_INFO_FOR_DELETE,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  ADD_OR_EDIT_EMPLOYEE_ERROR,
  ADD_OR_EDIT_EMPLOYEE_PENDING,
  ADD_OR_EDIT_EMPLOYEE_SUCCESS
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

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case GET_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case DELETE_EMPLOYEE_PENDING:
      return {
        ...state,
        pending: true
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((employee) => employee._id !== action.payload),
        pending: false
      };
    case DELETE_EMPLOYEE_ERROR:
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
    case ADD_OR_EDIT_EMPLOYEE_ERROR:
      return {
        ...state,
        error: true,
        pending: false
      };
    case ADD_OR_EDIT_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            return action.payload;
          }
          return item;
        }),
        pending: false
      };
    case ADD_OR_EDIT_EMPLOYEE_PENDING:
      return {
        ...state,
        pending: true
      };
    default:
      return state;
  }
};
