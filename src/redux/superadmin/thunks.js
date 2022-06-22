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
    fetch(options.url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        dispatch(postSuperAdminSuccess(response.data));
        dispatch(
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          })
        );
        dispatch(showFeedbackMessage(true));
      })
      .catch((error) => {
        dispatch(postSuperAdminError(error));
        dispatch(
          setInfoForFeedback({
            title: 'Something went wrong',
            description: error.message
          })
        );
        dispatch(showFeedbackMessage(true));
      });
  };
};

export const editSuperAdmin = (options) => {
  return (dispatch) => {
    dispatch(editSuperAdminsPending());
    fetch(options.url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        dispatch(editSuperAdminSuccess(response.data));
        dispatch(
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          })
        );
        dispatch(showFeedbackMessage(true));
      })
      .catch((error) => {
        dispatch(editSuperAdminError(error));
        dispatch(
          setInfoForFeedback({
            title: 'Something went wrong',
            description: error.message
          })
        );
        dispatch(showFeedbackMessage(true));
      });
  };
};
