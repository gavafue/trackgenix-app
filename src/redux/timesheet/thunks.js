import {
  getTimesheetsSuccess,
  getTimesheetsError,
  getTimesheetsPending,
  deleteTimesheetError,
  deleteTimesheetSuccess,
  deleteTimesheetPending,
  setInfoForFeedback,
  showFeedbackMessage,
  addTimesheetsError,
  addTimesheetsPending,
  addTimesheetsSuccess,
  editTimesheetsError,
  editTimesheetsPending,
  editTimesheetsSuccess
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
      .catch((err) => {
        dispatch(deleteTimesheetError(err));
        dispatch(setInfoForFeedback({ title: 'Something went wrong.', description: err.message }));
      });
  };
};

export const addTimesheet = (options) => {
  return (dispatch) => {
    dispatch(addTimesheetsPending());
    fetch(options.url, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          dispatch(addTimesheetsSuccess(res.data));
          dispatch(
            setInfoForFeedback({
              title: 'Request done!',
              description: res.message
            })
          );
          dispatch(showFeedbackMessage(true));
        } else {
          dispatch(
            setInfoForFeedback({
              title: 'Something went wrong',
              description: res.message
            })
          );
          dispatch(showFeedbackMessage(true));
          dispatch(addTimesheetsError(res.data.message));
        }
      })
      .catch((error) => {
        dispatch(addTimesheetsError(error));
        dispatch(
          setInfoForFeedback({ title: 'Something went wrong.', description: error.message })
        );
      });
  };
};
export const editTimesheet = (options) => {
  return (dispatch) => {
    dispatch(editTimesheetsPending());
    fetch(options.url, options)
      .then((res) => res.json())
      .then((res) => {
        if (!res.error) {
          dispatch(editTimesheetsSuccess(res.data));
          dispatch(
            setInfoForFeedback({
              title: 'Request done!',
              description: res.message
            })
          );
          dispatch(showFeedbackMessage(true));
        } else {
          dispatch(
            setInfoForFeedback({
              title: 'Something went wrong',
              description: res.message
            })
          );
          dispatch(showFeedbackMessage(true));
          dispatch(editTimesheetsError(res.data.message));
        }
      })
      .catch((error) => {
        dispatch(editTimesheetsError(error));
        dispatch(
          setInfoForFeedback({ title: 'Something went wrong.', description: error.message })
        );
      });
  };
};
