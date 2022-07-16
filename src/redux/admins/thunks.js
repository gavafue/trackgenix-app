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
  postAdminError,
  editAdminPending,
  editAdminError,
  editAdminSuccess,
  editAdminStatusError,
  editAdminStatusPending,
  editAdminStatusSuccess
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
    dispatch(postAdminPending());
    fetch(options.url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          dispatch(postAdminError(response.error));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
          dispatch(showFeedbackMessage(true));
        } else {
          dispatch(postAdminSuccess(response.data));
          dispatch(setInfoForFeedback({ title: 'Request done!', description: response.message }));
          dispatch(showFeedbackMessage(true));
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(postAdminError(error.toString()));
      });
  };
};

export const editAdmin = (options) => {
  return (dispatch) => {
    dispatch(editAdminPending());
    fetch(options.url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          dispatch(
            setInfoForFeedback({
              title: 'Something went wrong',
              description: response.message
            })
          );
          dispatch(showFeedbackMessage(true));
          dispatch(editAdminError(response.data.message));
        } else {
          dispatch(editAdminSuccess(response.data));
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
        console.log(error);
        dispatch(editAdminError(error.toString()));
      });
  };
};

// export const ChangeAdminStatus = (adminId, options) => {
//   return (dispatch) => {
//     dispatch(deleteAdminPending());
//     const options = {
//       method: 'DELETE',
//       url: `${process.env.REACT_APP_API_URL}/admins/lowlogic/${adminId}`,
//       body: {
//       }
//     };
//     return fetch(options.url, options)
//       .then((response) => response.json())
//       .then((response) => {
//         if (response.error) {
//           dispatch(deleteAdminError(response.error));
//           dispatch(
//             setInfoForFeedback({ title: 'Something went wrong', description: response.message })
//           );
//         } else {
//           dispatch(deleteAdminSuccess(adminId));
//           dispatch(
//             setInfoForFeedback({
//               title: 'Request done!',
//               description: response.message
//             })
//           );
//           dispatch(showFeedbackMessage(true));
//         }
//       })
//       .catch((err) => console.log(err));
//   };
// };

export const editAdminStatus = (options) => {
  return (dispatch) => {
    dispatch(editAdminStatusPending());
    fetch(options.url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (response.error) {
          dispatch(
            setInfoForFeedback({
              title: 'Something went wrong',
              description: response.message
            })
          );
          dispatch(showFeedbackMessage(true));
          dispatch(editAdminStatusError(response.message));
        } else {
          dispatch(editAdminStatusSuccess(response.data));
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
        console.log(error);
        dispatch(editAdminStatusError(error.toString()));
      });
  };
};
