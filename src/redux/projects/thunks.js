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
  editProjectSuccess
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
        dispatch(postProjectSuccess(response.data));
        dispatch(setInfoForFeedback({ title: 'Request done!', description: response.message }));
        dispatch(showFeedbackMessage(true));
      })
      .catch((error) => {
        dispatch(postProjectError(error.toString()));
        dispatch(setInfoForFeedback({ title: 'Something went wrong', description: error.message }));
        dispatch(showFeedbackMessage(true));
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
        dispatch(editProjectSuccess(response.data));
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
        dispatch(editProjectError(error.toString()));
      });
  };
};
