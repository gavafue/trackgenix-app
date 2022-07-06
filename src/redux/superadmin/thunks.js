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
      .then((response) => response.json())
      .then((response) => {
        dispatch(getSuperAdminsSuccess(response.data));
        return response.data;
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
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(deleteSuperAdminError(response.error));
          dispatch(
            setInfoForFeedback({
              title: 'Something went wrong',
              description: response.message
            })
          );
        } else {
          dispatch(deleteSuperAdminSuccess(superAdminId));
          dispatch(
            setInfoForFeedback({
              title: 'Request done!',
              description: response.message
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
