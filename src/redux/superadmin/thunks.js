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
  postSuperAdminSuccess,
  editSuperAdminError,
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

export const deleteSuperAdmin = (id) => {
  return (dispatch) => {
    dispatch(deleteSuperAdminPending());
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/super-admins/${id}`
    };
    return fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(deleteSuperAdminError(response.error));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
        } else {
          dispatch(deleteSuperAdminSuccess(id));
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
    let isValid;
    fetch(options.url, options)
      .then((res) => {
        isValid = res.status == 201 || res.status == 200;
        return res.json();
      })
      .then((res) => {
        if (isValid) {
          dispatch(postSuperAdminSuccess(res.data));
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
          dispatch(postSuperAdminError(res.data.message));
        }
      })
      .catch((error) => {
        dispatch(postSuperAdminError(error));
      });
  };
};

export const editSuperAdmin = (options) => {
  return (dispatch) => {
    let isValid;
    fetch(options.url, options)
      .then((res) => {
        isValid = res.status == 201 || res.status == 200;
        return res.json();
      })
      .then((res) => {
        if (isValid) {
          dispatch(editSuperAdminSuccess(res.data));
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
          dispatch(editSuperAdminError(res.data.message));
        }
      })
      .catch((error) => {
        dispatch(editSuperAdminError(error));
      });
  };
};
