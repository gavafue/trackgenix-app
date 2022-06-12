import { getTimesheetsSuccess, getTimesheetsError, getTimesheetsPending } from './actions';
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
1;
