import {
  getAdminsSuccess,
  getAdminsError,
  getAdminsPending,
  deleteAdminError,
  deleteAdminSuccess,
  deleteAdminPending,
  setInfoForFeedback,
  showFeedbackMessage,
  postAdminPending,
  postAdminSuccess,
  postAdminError
} from './actions';

export const getAdmins = () => {
  return (dispatch) => {
    dispatch(getAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/admins`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getAdminsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getAdminsError(error.toString()));
      });
  };
};

export const deleteAdmin = (adminId) => {
  return (dispatch) => {
    dispatch(deleteAdminPending());
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/admins/${adminId}`
    };
    return fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(deleteAdminError(response.error));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
        } else {
          dispatch(deleteAdminSuccess(adminId));
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

export const postAdmin = (options) => {
  return (dispatch) => {
    let isValid;
    dispatch(postAdminPending());
    fetch(options.url, options)
      .then((response) => {
        isValid = response.status == 201 || response.status == 200;
        return response.json();
      })
      .then((response) => {
        console.log(response);
        if (isValid) {
          dispatch(postAdminSuccess(response.data));
          dispatch(setInfoForFeedback({ title: 'Request done!', description: response.message }));
          dispatch(showFeedbackMessage(true));
        } else {
          dispatch(postAdminError(response.status));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
          dispatch(showFeedbackMessage(true));
        }
      })
      .catch((error) => {
        dispatch(postAdminError(error.toString()));
      });
  };
};
