import {
  getTimesheetsSuccess,
  getTimesheetsError,
  getTimesheetsPending,
  deleteTimesheetError,
  deleteTimesheetSuccess,
  deleteTimesheetPending,
  setInfoForFeedback,
  showFeedbackMessage
} from './actions';
const API_URL = process.env.REACT_APP_API_URL;

export const getTimesheets = () => {
  return (dispatch) => {
    dispatch(getTimesheetsPending());
    return fetch(`${API_URL}/timesheets`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getTimesheetsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getTimesheetsError(error.toString()));
      });
  };
};

export const deleteTimesheet = (timesheetId) => {
  return (dispatch) => {
    dispatch(deleteTimesheetPending());
    const options = {
      method: 'DELETE',
      url: `${API_URL}/timesheets/${timesheetId}`
    };
    return fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(deleteTimesheetError(response.error));
          dispatch(
            setInfoForFeedback({
              title: 'Something went wrong',
              description: response.message
            })
          );
        } else {
          dispatch(deleteTimesheetSuccess(timesheetId));
          dispatch(
            setInfoForFeedback({
              title: 'Request done!',
              description: response.message
            })
          );
          dispatch(showFeedbackMessage(true));
        }
      })
      .catch((err) => console.log(err));
  };
};
