import {
  getEmployeeSuccess,
  getEmployeeError,
  getEmployeePending,
  deleteEmployeeError,
  deleteEmployeeSuccess,
  deleteEmployeePending,
  setInfoForFeedback,
  showFeedbackMessage
} from './actions';

export const getEmployee = () => {
  return (dispatch) => {
    dispatch(getEmployeePending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getEmployeeSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getEmployeeError(error.toString()));
      });
  };
};

export const deleteEmployee = (employeeId) => {
  return (dispatch) => {
    dispatch(deleteEmployeePending());
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/employees/${employeeId}`
    };
    return fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(deleteEmployeeError(response.error));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
        } else {
          dispatch(deleteEmployeeSuccess(employeeId));
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
