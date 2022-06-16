import {
  getSuperAdminsError,
  getSuperAdminsSuccess,
  getSuperAdminsPending,
  deleteSuperAdminError,
  deleteSuperAdminSuccess,
  deleteSuperAdminPending,
  setInfoForFeedback,
  showFeedbackMessage,
  postSuperAdminError,
  postSuperAdminsPending,
  postSuperAdminSuccess,
  editSuperAdminError,
  editSuperAdminsPending,
  editSuperAdminSuccess
} from './actions';

export const getSuperadmins = () => {
  return (dispatch) => {
    dispatch(getSuperAdminsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/super-admin`)
      .then((responseponse) => responseponse.json())
      .then((responseponse) => {
        dispatch(getSuperAdminsSuccess(responseponse.data));
        return responseponse.data;
      })
      .catch((error) => {
        dispatch(getSuperAdminsError(error.toString()));
      });
  };
};

export const deleteSuperAdmin = (superAdminId) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminPending());
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/super-admin/${superAdminId}`
    };
    return fetch(options.url, options)
      .then((responseponse) => responseponse.json())
      .then((responseponse) => {
        if (responseponse.error) {
          dispatch(deleteSuperAdminError(responseponse.error));
          dispatch(
            setInfoForFeedback({
              title: 'Something went wrong',
              description: responseponse.message
            })
          );
        } else {
          dispatch(deleteSuperAdminSuccess(superAdminId));
          dispatch(
            setInfoForFeedback({
              title: 'Request done!',
              description: responseponse.message
            })
          );
          dispatch(showFeedbackMessage(true));
        }
      })
      .catch((error) => console.log(error));
  };
};

export const postSuperAdmin = (options) => {
  return (dispatch) => {
    dispatch(postSuperAdminsPending());
    let isValid;
    fetch(options.url, options)
      .then((response) => {
        isValid = response.status == 201 || response.status == 200;
        return response.json();
      })
      .then((response) => {
        if (isValid) {
          dispatch(postSuperAdminSuccess(response.data));
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
          dispatch(postSuperAdminError(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(postSuperAdminError(error));
      });
  };
};

export const editSuperAdmin = (options) => {
  return (dispatch) => {
    dispatch(editSuperAdminsPending());
    let isValid;
    fetch(options.url, options)
      .then((response) => {
        isValid = response.status == 201 || response.status == 200;
        return response.json();
      })
      .then((response) => {
        if (!isValid) {
          dispatch(
            setInfoForFeedback({
              title: 'Something went wrong',
              description: response.message
            })
          );
          dispatch(showFeedbackMessage(true));
          dispatch(editSuperAdminError(response.data.message));
        } else {
          dispatch(editSuperAdminSuccess(response.data));
          dispatch(
            setInfoForFeedback({
              title: 'Request done!',
              description: response.message
            })
          );
          dispatch(showFeedbackMessage(true));
        }
      })
      .catch((error) => {
        dispatch(editSuperAdminError(error));
      });
  };
};
