import { useEffect } from 'react';
import Table from '../Shared/Table';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Loader from '../Shared/Preloader';
import { useHistory } from 'react-router-dom';
import styles from './projects.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from '../../redux/projects/thunks';
import {
  setInfoForDelete,
  showDeleteMessage,
  showFeedbackMessage
} from '../../redux/projects/actions';

const Projects = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => state.projects.list);
  const isPending = useSelector((state) => state.projects.pending);
  const feedbackInfo = useSelector((state) => state.projects.infoForFeedback);
  const deleteInfo = useSelector((state) => state.projects.infoForDelete);
  const showDelete = useSelector((state) => state.projects.showDeleteMessage);
  const showFeedback = useSelector((state) => state.projects.showFeedbackMessage);

  const editData = (id) => {
    history.push(`/projects/form/${id}`);
  };
  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const deleteHandler = () => {
    dispatch(deleteProject(deleteInfo));
  };

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <div>
        <Button label="Add new project" onClick={() => history.push(`/projects/form`)} />
      </div>
      <Table
        data={projects}
        headersName={['Project', 'Description', 'Client', 'Start Date', 'End Date']}
        headers={['name', 'description', 'client', 'startDate', 'endDate']}
        deleteProject={deleteHandler}
        editData={editData}
        setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
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
          setShowModal={(boolean) => dispatch(showDeleteMessage(boolean))}
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
      {isPending && <Loader />}
    </section>
  );
};

export default Projects;
