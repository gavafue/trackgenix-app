import {
  getProjectsSuccess,
  getProjectsError,
  getProjectsPending,
  deleteProjectError,
  deleteProjectSuccess,
  deleteProjectPending,
  setInfoForFeedback,
  showFeedbackMessage,
  postProjectSuccess,
  postProjectError,
  postProjectPending,
  editProjectPending,
  editProjectError,
  editProjectSuccess,
  editProjectStatusError,
  editProjectStatusPending,
  editProjectStatusSuccess
} from './actions';

export const getProjects = () => {
  return (dispatch) => {
    dispatch(getProjectsPending());
    return fetch(`${process.env.REACT_APP_API_URL}/projects`)
      .then((response) => response.json())
      .then((response) => {
        dispatch(getProjectsSuccess(response.data));
        return response.data;
      })
      .catch((error) => {
        dispatch(getProjectsError(error.toString()));
      });
  };
};

export const deleteProject = (projectId) => {
  return (dispatch) => {
    dispatch(deleteProjectPending());
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/projects/${projectId}`
    };
    return fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error) {
          dispatch(deleteProjectError(response.error));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
        } else {
          dispatch(deleteProjectSuccess(projectId));
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

export const postProject = (options) => {
  return (dispatch) => {
    dispatch(postProjectPending());
    fetch(options.url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (!response.error) {
          dispatch(postProjectSuccess(response.data));
          dispatch(setInfoForFeedback({ title: 'Request done!', description: response.message }));
          dispatch(showFeedbackMessage(true));
        } else {
          dispatch(postProjectError(response.data.message));
          dispatch(
            setInfoForFeedback({ title: 'Something went wrong', description: response.message })
          );
          dispatch(showFeedbackMessage(true));
        }
      })
      .catch((error) => {
        dispatch(postProjectError(error));
      });
  };
};

export const editProject = (options) => {
  return (dispatch) => {
    dispatch(editProjectPending());
    fetch(options.url, options)
      .then((response) => {
        return response.json();
      })
      .then((response) => {
        if (!response.error) {
          dispatch(editProjectSuccess(response.data));
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
          dispatch(editProjectError(response.data.message));
        }
      })
      .catch((error) => {
        dispatch(editProjectError(error));
      });
  };
};

export const editProjectStatus = (options) => {
  return (dispatch) => {
    dispatch(editProjectStatusPending());
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
          dispatch(editProjectStatusError(response.message));
        } else {
          dispatch(editProjectStatusSuccess(response.data));
          dispatch(
            setInfoForFeedback({
              title: 'Request done!',
              description: response.message
            })
          );
          dispatch(showFeedbackMessage(true));
          dispatch(getProjects());
        }
      })
      .catch((error) => {
        console.log(error);
        dispatch(editProjectStatusError(error.toString()));
      });
  };
};
