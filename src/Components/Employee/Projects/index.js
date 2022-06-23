import styles from './projects.module.css';
import { useEffect } from 'react';
import EmployeeTable from '../TableAndContents/table';
import { useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { useDispatch } from 'react-redux';
import ProjectsTableContent from '../TableAndContents/Content/projectsTableContent';
import { setInfoToShow, showInfoMessage } from 'redux/projects/actions';
import Modal from 'Components/Shared/Modal';
import InfoMessage from 'Components/Shared/ShowInfoMessage';

const Projects = () => {
  const projects = useSelector((state) => state.projects.list);
  const dispatch = useDispatch();
  const employeeLogged = useSelector((state) => state.employees.employeeLogged);
  const showInfo = useSelector((state) => state.projects.showInfo);
  const infoToShow = useSelector((state) => state.projects.infoToShow);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const projectsToTable = projects
    .filter((project) => project.members[0].name?._id === employeeLogged._id)
    .map((project) => ({
      projectId: project._id,
      projectName: project.name,
      memberRole: project.members[0]?.role || 'Not Found',
      memberRate: project.members[0]?.rate || 'Not Found'
    }));
  return (
    <section className={styles.container}>
      <EmployeeTable headersName={['Project', 'Role', 'Rate']}>
        <ProjectsTableContent
          data={projectsToTable}
          headers={['projectName', 'memberRole', 'memberRate']}
          setInfoToShow={() =>
            dispatch(setInfoToShow({ title: projects.projectName, description: 'lalal' }))
          }
          setShowModal={(show) => dispatch(showInfoMessage(show))}
        />
      </EmployeeTable>
      <Modal
        isOpen={showInfo}
        handleClose={() => {
          dispatch(showInfoMessage(!showInfo));
        }}
      >
        <InfoMessage infoToShow={infoToShow} />
      </Modal>
    </section>
  );
};

export default Projects;
