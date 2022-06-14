import {
  getEmployeeSuccess,
  getEmployeeError,
  getEmployeePending,
  deleteEmployeeError,
  deleteEmployeeSuccess,
  deleteEmployeePending,
  setInfoForFeedback,
  showFeedbackMessage,
  addOrEditEmployeeError,
  addOrEditEmployeePending,
  addOrEditEmployeeSuccess
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

export const addOrEditEmployee = (options) => {
  return (dispatch) => {
    dispatch(addOrEditEmployeePending());
    let isValid;
    fetch(options.url, options)
      .then((res) => {
        isValid = res.status == 201 || res.status == 200;
        return res.json();
      })
      .then((res) => {
        if (isValid) {
          dispatch(addOrEditEmployeeSuccess(res.message));
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
          dispatch(addOrEditEmployeeError(res.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(addOrEditEmployeeError(error));
      });
  };
};
