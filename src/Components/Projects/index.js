import { useEffect } from 'react';
import Table from 'Components/Shared/Table';
import DeleteMessage from 'Components/Shared/DeleteMessage';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Button from 'Components/Shared/Button';
import Preloader from 'Components/Shared/Preloader';
import { useHistory } from 'react-router-dom';
import styles from './projects.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import {
  setInfoForDelete,
  showDeleteMessage,
  showFeedbackMessage,
  getSelectedProject,
  cleanSelectedProject
} from 'redux/projects/actions';

const Projects = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => state.projects.list);
  const isPending = useSelector((state) => state.projects.isPending);
  const feedbackInfo = useSelector((state) => state.projects.infoForFeedback);
  const deleteInfo = useSelector((state) => state.projects.infoForDelete);
  const showDelete = useSelector((state) => state.projects.showDeleteMessage);
  const showFeedback = useSelector((state) => state.projects.showFeedbackMessage);

  const editData = (row) => {
    dispatch(getSelectedProject(row));
    history.push(`/projects/form/`);
  };
  useEffect(() => {
    dispatch(cleanSelectedProject());
    dispatch(getProjects());
  }, []);

  const deleteHandler = () => {
    dispatch(deleteProject(deleteInfo));
  };
  const projectsData = projects.map((project) => {
    return {
      ...project,
      pm: project.pm ? `${project.pm?.firstName} ${project.pm?.lastName}` : '',
      startDate: project.startDate.slice(0, 10),
      endDate: project.endDate.slice(0, 10)
    };
  });

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <div>
        <Button label="Add new project" onClick={() => history.push(`/projects/form`)} />
      </div>
      <Table
        data={projectsData}
        headersName={['Project', 'PM', 'Description', 'Client', 'Start Date', 'End Date']}
        headers={['name', 'pm', 'description', 'client', 'startDate', 'endDate']}
        deleteProject={deleteHandler}
        editData={editData}
        setShowModal={(show) => dispatch(showDeleteMessage(show))}
        setInfoForDelete={(projectId) => dispatch(setInfoForDelete(projectId))}
      />
      <Modal
        isOpen={showDelete}
        handleClose={() => {
          dispatch(showDeleteMessage(!showDelete));
        }}
      >
        <DeleteMessage
          handleClose={() => {
            dispatch(showDeleteMessage(!showDelete));
          }}
          infoForDelete={deleteInfo}
          deleteItem={deleteHandler}
          setShowModal={(show) => dispatch(showDeleteMessage(show))}
        />
      </Modal>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(!showFeedback));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </section>
  );
};

export default Projects;
