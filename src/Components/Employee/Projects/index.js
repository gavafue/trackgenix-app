import styles from './projects.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { useDispatch } from 'react-redux';
import EmployeeTable from 'Components/Employee/TableAndContents';
import ProjectsTableContent from 'Components/Employee/TableAndContents/Content/projectsTableContent';
import ProjectManagerProjectsContent from '../TableAndContents/Content/PMprojectsTableContent';
import Button from 'Components/Shared/Button';
import { cleanSelectedProject } from 'redux/projects/actions';

const Projects = () => {
  const dispatch = useDispatch();
  const [toggleTable, setToggleTable] = useState(true);

  useEffect(() => {
    dispatch(cleanSelectedProject());
    dispatch(getProjects());
  }, []);

  const projects = useSelector((state) => state.projects.list);
  const employeeLogged = useSelector((state) => state.auth.authenticated?.data);

  const employeeProjects = projects.reduce((acc, project) => {
    const assignedProjectEmployee = project.members.find((employee) => {
      return employee.name?._id === employeeLogged?._id;
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
    if (project.pm?._id === employeeLogged?._id) {
      return [
        ...acc,
        {
          name: project.name,
          pm: project.pm,
          _id: project._id,
          status: project.active ? 'Active' : 'Inactive',
          client: project.client,
          description: project.description,
          startDate: project.startDate,
          endDate: project.endDate,
          active: project.active,
          members: project.members,
          membersString: project.members
            .map((member) => `${member.name?.firstName} ${member.name?.lastName}`)
            .join(', \n'),
          role: 'PM'
        }
      ];
    }
    return acc;
  }, []);

  return (
    <section className={styles.container}>
      {Boolean(projectManagerProjects.length) && (
        <Button
          label={toggleTable ? 'Change to PM' : 'Change to Employee'}
          onClick={() => setToggleTable(!toggleTable)}
        />
      )}
      {toggleTable && (
        <div className={styles.container}>
          <h2>Employees Table</h2>
          <EmployeeTable
            headersName={['Project', 'Role', 'Rate', 'Status', 'Client', 'Description']}
          >
            <ProjectsTableContent
              data={employeeProjects}
              headers={['projectName', 'role', 'rate', 'status', 'client', 'description']}
            />
          </EmployeeTable>
        </div>
      )}

      {!toggleTable && (
        <div className={styles.container}>
          <h2>Project Manager Table</h2>
          <EmployeeTable
            headersName={['Project', 'Role', 'Status', 'Client', 'Members', 'Description']}
          >
            <ProjectManagerProjectsContent
              data={projectManagerProjects}
              headers={['name', 'role', 'status', 'client', 'membersString', 'description']}
            />
          </EmployeeTable>
        </div>
      )}
    </section>
  );
};

export default Projects;
