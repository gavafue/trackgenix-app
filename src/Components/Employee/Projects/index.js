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
  // const memberId = useSelector((state) => state.employees.employeeLogged);
  // console.log(memberId);

  // useEffect(() => {
  //   dispatch(getProjectsByMemberId(memberId._id));
  // }, []);
  useEffect(() => {
    dispatch(getProjects());
  }, []);
  const projectsToTable = projects.map((project) => ({
    projectId: project._id,
    projectName: project.name,
    memberRole: project.members[0]?.role || 'Not Found',
    memberRate: project.members[0]?.rate || 'Not Found',
    memberId: project.members[0]?._id || 'Not Found'
  }));

  return (
    <section className={styles.container}>
      <h2>Your Projects</h2>
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
