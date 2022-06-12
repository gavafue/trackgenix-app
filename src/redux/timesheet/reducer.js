import { GET_TIMESHEETS_PENDING, GET_TIMESHEETS_SUCCESS, GET_TIMESHEETS_ERROR } from './constants';

const initialState = {
  list: [],
  pending: false,
  error: '',
  infoForFeedback: { title: '', description: '' },
  showDeleteMessage: false,
  infoForDelete: '',
  showFeedbackMessage: false
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
    default:
      return state;
  }
};
