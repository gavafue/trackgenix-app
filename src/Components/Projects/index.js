import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import styles from './projects.module.css';
import Table from 'Components/Shared/Table';
import Modal from 'Components/Shared/Modal';
import FeedbackMessage from 'Components/Shared/FeedbackMessage';
import Button from 'Components/Shared/Button';
import Preloader from 'Components/Shared/Preloader';
import Input from 'Components/Shared/Input/InputText';
import ChangeStatusMessage from 'Components/Shared/ChangeStatusMessage';
import { useSelector, useDispatch } from 'react-redux';
import { getProjects, editProjectStatus } from 'redux/projects/thunks';
import {
  showFeedbackMessage,
  getSelectedProject,
  cleanSelectedProject,
  setidFromRow
} from 'redux/projects/actions';

const Projects = () => {
  const dispatch = useDispatch();
  const history = useHistory();
  const projects = useSelector((state) => state.projects.list);
  const isPending = useSelector((state) => state.projects.isPending);
  const feedbackInfo = useSelector((state) => state.projects.infoForFeedback);
  const showFeedback = useSelector((state) => state.projects.showFeedbackMessage);
  const idFromRow = useSelector((state) => state.projects.idFromRow);
  const [isActive, setIsActive] = useState(true);
  const [showModal, setShowModal] = useState(false);
  const [search, setSearch] = useState('');
  const changeStatus = isActive ? 'disable this' : 'activate this';
  const toggleIsActive = () => {
    setIsActive((current) => !current);
  };
  const handleSearch = (event) => {
    setSearch(event.target.value);
  };
  const editData = (row) => {
    dispatch(getSelectedProject(row));
    history.push(`/projects/form/`);
  };
  useEffect(() => {
    dispatch(cleanSelectedProject());
    dispatch(getProjects());
  }, []);

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
  const lowLogicHandler = () => {
    const options = {
      method: 'PUT',
      url: `${process.env.REACT_APP_API_URL}/projects/${idFromRow}`,
      headers: { 'Content-type': 'application/json' },
      body: JSON.stringify({
        active: !isActive
      })
    };
    dispatch(editProjectStatus(options));
  };

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
        setShowModal={setShowModal}
        editData={editData}
        setidFromRow={(projectId) => dispatch(setidFromRow(projectId))}
      />
      <Modal
        isOpen={showModal}
        handleClose={() => {
          setShowModal(false);
        }}
      >
        <ChangeStatusMessage
          handleClose={() => {
            setShowModal(false);
          }}
          resourceName={'Project'}
          operation={changeStatus}
          idFromRow={idFromRow}
          confirmChange={() => lowLogicHandler()}
          setShowModal={setShowModal}
        />
      </Modal>
      <Modal
        isOpen={showFeedback}
        handleClose={() => {
          dispatch(showFeedbackMessage(false));
        }}
      >
        <FeedbackMessage infoForFeedback={feedbackInfo} />
      </Modal>
      {isPending && <Preloader />}
    </section>
  );
};

export default Projects;
