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
  editEmployeeSuccess,
  getEmployeeByIdError,
  getEmployeeByIdPending,
  getEmployeeByIdSuccess
} from './actions';

export const getEmployee = () => {
  return (dispatch) => {
    dispatch(getEmployeePending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees`)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(getEmployeeError(response.error));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
        } else {
          dispatch(getEmployeeSuccess(response.data));
          return response.data;
        }
        dispatch(showFeedbackMessage(true));
      })
      .catch((err) => console.log(err));
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
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(postEmployeeError(response.error));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
          dispatch(showFeedbackMessage(true));
        } else {
          dispatch(postEmployeeSuccess(response.data));
          dispatch(setInfoForFeedback({ title: 'Request done!', description: response.message }));
          dispatch(showFeedbackMessage(true));
          return response.data;
        }
      })
      .catch((err) => console.log(err));
  };
};

export const editEmployee = (options) => {
  return (dispatch) => {
    dispatch(editEmployeePending());
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(editEmployeeError(response.error));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
          dispatch(showFeedbackMessage(true));
        } else {
          dispatch(editEmployeeSuccess(response.data));
          dispatch(setInfoForFeedback({ title: 'Request done!', description: response.message }));
          dispatch(showFeedbackMessage(true));
          return response.data;
        }
      })
      .catch((err) => console.log(err));
  };
};

export const getEmployeeById = (id) => {
  return (dispatch) => {
    dispatch(getEmployeeByIdPending());
    return fetch(`${process.env.REACT_APP_API_URL}/employees/${id}`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getEmployeeByIdSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getEmployeeByIdError(error.toString()));
      });
  };
};
