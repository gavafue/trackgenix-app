import {
  getSuperAdminsError,
  getSuperAdminsSuccess,
  getSuperAdminsPending
  // deleteSuperAdminError,
  // deleteSuperAdminSuccess,
  // deleteSuperAdminPending,
  // setInfoForDelete,
  // setInfoForFeedback,
  // showDeleteMessage,
  // showFeedbackMessage,
  // postSuperAdminError,
  // postSuperAdminSuccess,
  // editSuperAdminError,
  // editSuperAdminSuccess
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
