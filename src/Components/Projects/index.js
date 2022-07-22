import { useEffect, useState } from 'react';
import Table from 'Components/Shared/Table';
import DeleteMessage from 'Components/Shared/DeleteMessage';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Button from 'Components/Shared/Button';
import Preloader from 'Components/Shared/Preloader';
import Input from 'Components/Shared/Input/InputText';
import { useHistory } from 'react-router-dom';
import styles from './projects.module.css';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, deleteProject } from 'redux/projects/thunks';
import {
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
  const deleteInfo = useSelector((state) => state.projects.idFromRow);
  const showDelete = useSelector((state) => state.projects.showDeleteMessage);
  const showFeedback = useSelector((state) => state.projects.showFeedbackMessage);
  const [isActive, setIsActive] = useState(true);
  const toggleIsActive = () => {
    setIsActive((current) => !current);
  };
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
  const [search, setSearch] = useState('');

  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const projectsData = projects.map((project) => {
    if (isActive && project.active && project.name?.toLowerCase().includes(search.toLowerCase()))
      return {
        ...project,
        pmValue: project.pm ? `${project.pm?.firstName} ${project.pm?.lastName}` : '',
        startDate: project.startDate.slice(0, 10),
        endDate: project.endDate.slice(0, 10)
      };
    if (!isActive && !project.active && project.name?.toLowerCase().includes(search.toLowerCase()))
      return {
        ...project,
        pmValue: project.pm ? `${project.pm?.firstName} ${project.pm?.lastName}` : '',
        startDate: project.startDate.slice(0, 10),
        endDate: project.endDate.slice(0, 10)
      };
  });

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <div>
        <Button label="Add new project" onClick={() => history.push(`/projects/form`)} />
        <Button
          label={`Show ${!isActive ? 'Active' : 'Inactive'}`}
          onClick={toggleIsActive}
          theme="secondary"
        />
        <Input label="Search by project name:" id="search" type="text" onChange={handleSearch} />
      </div>
      <Table
        data={projectsData}
        headersName={['Project', 'PM', 'Description', 'Client', 'Start Date', 'End Date']}
        headers={['name', 'pmValue', 'description', 'client', 'startDate', 'endDate']}
        editData={editData}
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
          idFromRow={deleteInfo}
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
