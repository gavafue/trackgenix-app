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
  addTimesheetsSuccess,
  addTimesheetsPending,
  editTimesheetsError,
  editTimesheetsPending,
  editTimesheetsSuccess,
  getATimesheetsPending,
  getATimesheetsSuccess,
  getATimesheetsError
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

export const addTimesheet = (options) => {
  return (dispatch) => {
    dispatch(addTimesheetsPending());
    let isValid;
    fetch(options.url, options)
      .then((res) => {
        isValid = res.status == 201 || res.status == 200;
        return res.json();
      })
      .then((res) => {
        if (isValid) {
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
        console.log(error);
        dispatch(addTimesheetsError(error));
      });
  };
};

export const editTimesheet = (options) => {
  return (dispatch) => {
    dispatch(editTimesheetsPending());
    let isValid;
    fetch(options.url, options)
      .then((res) => {
        isValid = res.status == 201 || res.status == 200;
        return res.json();
      })
      .then((res) => {
        if (isValid) {
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
        console.log(error);
        dispatch(editTimesheetsError(error));
      });
  };
};
export const getTimesheet = (id) => {
  return (dispatch) => {
    dispatch(getATimesheetsPending());
    fetch(`${API_URL}/timesheets/${id}`)
      .then((res) => res.json())
      .then((res) => {
        dispatch(getATimesheetsSuccess(res.data));
        return res.data;
      })
      .catch((err) => {
        console.log(err);
        dispatch(getATimesheetsError(err));
      });
  };
};
