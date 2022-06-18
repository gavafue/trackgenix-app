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
  POST_EMPLOYEE_ERROR,
  POST_EMPLOYEE_SUCCESS,
  POST_EMPLOYEE_PENDING,
  EDIT_EMPLOYEE_ERROR,
  EDIT_EMPLOYEE_PENDING,
  EDIT_EMPLOYEE_SUCCESS,
  GET_SELECTED_EMPLOYEE,
  CLEAN_SELECTED_EMPLOYEE
} from './constants';

const initialState = {
  list: [],
  isPending: false,
  error: '',
  infoForFeedback: { title: '', description: '' },
  showDeleteMessage: false,
  infoForDelete: '',
  showFeedbackMessage: false,
  projectSelected: {}
};

export const employeesReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_EMPLOYEE_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    case GET_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case DELETE_EMPLOYEE_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: state.list.filter((employee) => employee._id !== action.payload),
        isPending: false
      };
    case DELETE_EMPLOYEE_ERROR:
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
    case POST_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case POST_EMPLOYEE_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false
      };
    case POST_EMPLOYEE_PENDING:
      return {
        ...state,
        isPending: true
      };
    case EDIT_EMPLOYEE_PENDING:
      return {
        ...state,
        isPending: true
      };
    case EDIT_EMPLOYEE_SUCCESS:
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
    case EDIT_EMPLOYEE_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case GET_SELECTED_EMPLOYEE:
      return {
        ...state,
        employeeSelected: action.payload
      };
    case CLEAN_SELECTED_EMPLOYEE:
      return {
        ...state,
        employeeSelected: {},
        isPending: false
      };
    default:
      return state;
  }
};
