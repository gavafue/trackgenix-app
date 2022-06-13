import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  SET_INFO_FOR_DELETE,
  SET_INFO_FOR_FEEDBACK,
  ADD_TIMESHEET_ERROR,
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_ERROR,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_SUCCESS,
  GET_A_TIMESHEET_ERROR,
  GET_A_TIMESHEET_PENDING,
  GET_A_TIMESHEET_SUCCESS
} from './constants';

const initialState = {
  list: [],
  pending: false,
  error: '',
  infoForFeedback: { title: '', description: '' },
  showDeleteMessage: false,
  infoForDelete: '',
  showFeedbackMessage: false,
  timesheetSelected: {}
};

export const timesheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        error: action.payload,
        pending: false
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        pending: true
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.filter((timesheet) => timesheet._id !== action.payload),
        pending: false
      };
    case DELETE_TIMESHEET_ERROR:
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
    case ADD_TIMESHEET_ERROR:
      return {
        ...state,
        error: true,
        pending: false
      };
    case ADD_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: action.payload,
        pending: false
      };
    case ADD_TIMESHEET_PENDING:
      return {
        ...state,
        pending: true
      };
    case EDIT_TIMESHEET_ERROR:
      return {
        ...state,
        error: true,
        pending: false
      };
    case EDIT_TIMESHEET_SUCCESS:
      return {
        ...state,
        timesheetSelected: action.payload,
        pending: false
      };
    case EDIT_TIMESHEET_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_A_TIMESHEET_SUCCESS:
      return {
        ...state,
        timesheetSelected: action.payload,
        pending: false
      };
    case GET_A_TIMESHEET_PENDING:
      return {
        ...state,
        pending: true
      };
    case GET_A_TIMESHEET_ERROR:
      return {
        ...state,
        error: true,
        pending: false
      };
    default:
      return state;
  }
};
