import {
  GET_TIMESHEETS_PENDING,
  GET_TIMESHEETS_SUCCESS,
  GET_TIMESHEETS_ERROR,
  DELETE_TIMESHEET_ERROR,
  DELETE_TIMESHEET_PENDING,
  DELETE_TIMESHEET_SUCCESS,
  SHOW_DELETE_MESSAGE,
  SHOW_FEEDBACK_MESSAGE,
  GET_ID_FROM_ROW,
  SET_INFO_FOR_FEEDBACK,
  ADD_TIMESHEET_ERROR,
  ADD_TIMESHEET_PENDING,
  ADD_TIMESHEET_SUCCESS,
  EDIT_TIMESHEET_ERROR,
  EDIT_TIMESHEET_PENDING,
  EDIT_TIMESHEET_SUCCESS,
  CLEAN_SELECTED_TIMESHEET,
  SELECTED_TIMESHEET,
  ADD_HOURS_TIMESHEET_ERROR,
  ADD_HOURS_TIMESHEET_PENDING,
  ADD_HOURS_TIMESHEET_SUCCESS
} from './constants';

const initialState = {
  list: [],
  isPending: false,
  error: '',
  infoForFeedback: { title: '', description: '' },
  showDeleteMessage: false,
  idFromRow: '',
  showFeedbackMessage: false,
  timesheetSelected: {}
};

export const timesheetsReducer = (state = initialState, action) => {
  switch (action.type) {
    case GET_TIMESHEETS_PENDING:
      return {
        ...state,
        isPending: true
      };
    case GET_TIMESHEETS_SUCCESS:
      return {
        ...state,
        list: action.payload,
        isPending: false
      };
    case GET_TIMESHEETS_ERROR:
      return {
        ...state,
        error: action.payload,
        isPending: false
      };
    case DELETE_TIMESHEET_PENDING:
      return {
        ...state,
        isPending: true
      };
    case DELETE_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.filter((timesheet) => timesheet._id !== action.payload),
        isPending: false
      };
    case DELETE_TIMESHEET_ERROR:
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
    case ADD_TIMESHEET_ERROR:
      return {
        ...state,
        error: true,
        isPending: false
      };
    case ADD_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: [...state.list, action.payload],
        isPending: false
      };
    case ADD_TIMESHEET_PENDING:
      return {
        ...state,
        isPending: true
      };
    case EDIT_TIMESHEET_ERROR:
      return {
        ...state,
        error: true,
        isPending: false
      };
    case EDIT_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.map((timesheet) => {
          if (timesheet._id === action.payload._id) {
            return action.payload;
          }
          return timesheet;
        }),
        isPending: false
      };

    case EDIT_TIMESHEET_PENDING:
      return {
        ...state,
        isPending: true
      };
    case SELECTED_TIMESHEET:
      return {
        ...state,
        timesheetSelected: action.payload
      };
    case CLEAN_SELECTED_TIMESHEET:
      return {
        ...state,
        timesheetSelected: {},
        isPending: false
      };
    case ADD_HOURS_TIMESHEET_ERROR:
      return {
        ...state,
        error: true,
        isPending: false
      };
    case ADD_HOURS_TIMESHEET_SUCCESS:
      return {
        ...state,
        list: state.list.map((item) => {
          if (item._id === action.payload._id) {
            return { ...item, hoursWorked: action.payload };
          }
          return item;
        }),
        isPending: false
      };
    case ADD_HOURS_TIMESHEET_PENDING:
      return {
        ...state,
        isPending: true
      };
    default:
      return state;
  }
};
