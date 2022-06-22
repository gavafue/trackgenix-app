import styles from './projects.module.css';
import { useEffect } from 'react';
import EmployeeTable from '../TableAndContents/table';
import { useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { useDispatch } from 'react-redux';
import ProjectsTableContent from '../TableAndContents/Content/projectsTableContent';

function Projects() {
  const projects = useSelector((state) => state.projects.list);
  const dispatch = useDispatch();
  const employeeLogged = useSelector((state) => state.employees.employeeLogged);

  useEffect(() => {
    dispatch(getProjects());
  }, []);

  const projectsToTable = projects
    .filter((project) => project.members[0].name?._id === employeeLogged._id)
    .map((project) => ({
      projectId: project._id,
      projectName: project.name,
      memberRole: project.members[0]?.role || 'Not Found',
      memberRate: project.members[0]?.rate || 'Not Found',
      memberId: project.members[0]?.name?._id || 'Not Found'
    }));

  return (
    <section className={styles.container}>
      <EmployeeTable headersName={['Project', 'Role', 'Hours']}>
        <ProjectsTableContent
          data={projectsToTable}
          headers={['projectName', 'memberRole', 'memberRate']}
        />
      </EmployeeTable>
    </section>
  );
}

export default Projects;
