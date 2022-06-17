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
    dispatch(postEmployeePending());
    fetch(options.url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        dispatch(postEmployeeSuccess(response.data));
        dispatch(setInfoForFeedback({ title: 'Request done!', description: response.message }));
        dispatch(showFeedbackMessage(true));
      })
      .catch((error) => {
        dispatch(postEmployeeError(error.toString()));
        dispatch(setInfoForFeedback({ title: 'Something went wrong', description: error.message }));
        dispatch(showFeedbackMessage(true));
      });
  };
};

export const editEmployee = (options) => {
  return (dispatch) => {
    dispatch(editEmployeePending());
    fetch(options.url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        dispatch(editEmployeeSuccess(response.data));
        dispatch(
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          })
        );
        dispatch(showFeedbackMessage(true));
      })
      .catch((error) => {
        dispatch(
          setInfoForFeedback({
            title: 'Something went wrong',
            description: error.message
          })
        );
        dispatch(showFeedbackMessage(true));
        dispatch(editEmployeeError(error.toString()));
      });
  };
};
