import {
  getEmployeeSuccess,
  getEmployeeError,
  getEmployeePending,
  deleteEmployeeError,
  deleteEmployeeSuccess,
  deleteEmployeePending,
  setInfoForFeedback,
  showFeedbackMessage,
  postEmployeeSuccess,
  postEmployeeError,
  postEmployeePending,
  editEmployeePending,
  editEmployeeError,
  editEmployeeSuccess
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

export const postEmployee = (options) => {
  return (dispatch) => {
    let isValid;
    dispatch(postEmployeePending());
    fetch(options.url, options)
      .then((response) => {
        isValid = response.status == 201 || response.status == 200;
        return response.json();
      })
      .then((response) => {
        if (isValid) {
          dispatch(postEmployeeSuccess(response.data));
          dispatch(setInfoForFeedback({ title: 'Request done!', description: response.message }));
          dispatch(showFeedbackMessage(true));
        } else {
          dispatch(postEmployeeError(response.status));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
          dispatch(showFeedbackMessage(true));
        }
      })
      .catch((error) => {
        dispatch(postEmployeeError(error.toString()));
      });
  };
};

export const editEmployee = (options) => {
  return (dispatch) => {
    dispatch(editEmployeePending());
    let isValid;
    fetch(options.url, options)
      .then((response) => {
        isValid = response.status == 201 || response.status == 200;
        return response.json();
      })
      .then((response) => {
        if (isValid) {
          dispatch(editEmployeeSuccess(response.data));
          dispatch(
            setInfoForFeedback({
              title: 'Request done!',
              description: response.message
            })
          );
          dispatch(showFeedbackMessage(true));
        } else {
          dispatch(
            setInfoForFeedback({
              title: 'Something went wrong',
              description: response.message
            })
          );
          dispatch(showFeedbackMessage(true));
          dispatch(editEmployeeError(response.data.message));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(editEmployeeError(error));
      });
  };
};
