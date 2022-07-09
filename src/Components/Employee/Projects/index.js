import styles from './projects.module.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { useDispatch } from 'react-redux';
import { getTimesheets } from 'redux/timesheet/thunks';
import EmployeeTable from 'Components/Employee/TableAndContents';
import ProjectsTableContent from 'Components/Employee/TableAndContents/Content/projectsTableContent';

const Projects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getTimesheets());
  }, []);

  const projects = useSelector((state) => state.projects.list);
  const employeeLogged = useSelector((state) => state.employees.employeeLogged);

  const employeeProjects = projects.reduce((acc, project) => {
    const assignedProject = project.members.find((employee) => {
      return employee.name?._id === employeeLogged?._id;
    });
    if (assignedProject && Object.keys(assignedProject).length) {
      return [
        ...acc,
        {
          projectName: project.name,
          projectId: project._id,
          status: project.active ? 'Active' : 'Inactive',
          client: project.client,
          description: project.description,
          role: assignedProject.role,
          rate: assignedProject.rate
        }
      ];
    }
    return acc;
  }, []);
  return (
    <section className={styles.container}>
      <EmployeeTable headersName={['Project', 'Role', 'Rate', 'Status', 'Client', 'Description']}>
        <ProjectsTableContent
          data={employeeProjects}
          headers={['projectName', 'role', 'rate', 'status', 'client', 'description']}
        />
      </EmployeeTable>
    </section>
  );
};

export default Projects;
