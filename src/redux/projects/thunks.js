import {
  getProjectsSuccess,
  getProjectsError,
  getProjectsPending,
  deleteProjectError,
  deleteProjectSuccess,
  deleteProjectPending,
  setInfoForFeedback,
  showFeedbackMessage
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
