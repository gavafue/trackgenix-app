import styles from './projects.module.css';
import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { useDispatch } from 'react-redux';
import { getTimesheets } from 'redux/timesheet/thunks';
import EmployeeTable from 'Components/Employee/TableAndContents';
import ProjectsTableContent from 'Components/Employee/TableAndContents/Content/projectsTableContent';
import ProjectManagerProjectsContent from '../TableAndContents/Content/PMprojectsTableContent';
const Projects = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getProjects());
    dispatch(getTimesheets());
  }, []);

  const projects = useSelector((state) => state.projects.list);
  const employeeLogged = useSelector((state) => state.auth.authenticated?.data);
  const employeeProjects = projects.reduce((acc, project) => {
    const assignedProjectEmployee = project.members.find((employee) => {
      return employee.name?._id === employeeLogged?._id && employee.role != 'PM';
    });
    if (assignedProjectEmployee && Object.keys(assignedProjectEmployee).length) {
      return [
        ...acc,
        {
          projectName: project.name,
          projectId: project._id,
          status: project.active ? 'Active' : 'Inactive',
          client: project.client,
          description: project.description,
          role: assignedProjectEmployee.role,
          rate: assignedProjectEmployee.rate
        }
      ];
    }
    return acc;
  }, []);

  const projectManagerProjects = projects.reduce((acc, project) => {
    const assignedPMProjects = project.members.find((employee) => {
      return employee.name?._id === employeeLogged?._id && employee.role === 'PM';
    });
    if (assignedPMProjects && Object.keys(assignedPMProjects).length) {
      return [
        ...acc,
        {
          projectName: project.name,
          projectId: project._id,
          status: project.active ? 'Active' : 'Inactive',
          client: project.client,
          description: project.description,
          role: assignedPMProjects.role,
          rate: assignedPMProjects.rate
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

      <EmployeeTable headersName={['Project', 'Role', 'Rate', 'Status', 'Client', 'Description']}>
        <ProjectManagerProjectsContent
          data={projectManagerProjects}
          headers={['projectName', 'role', 'rate', 'status', 'client', 'description']}
        />
      </EmployeeTable>
    </section>
  );
};

export default Projects;
