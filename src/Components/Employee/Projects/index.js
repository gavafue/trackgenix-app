import styles from './projects.module.css';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { getProjects } from 'redux/projects/thunks';
import { useDispatch } from 'react-redux';
import EmployeeTable from 'Components/Employee/TableAndContents';
import ProjectsTableContent from 'Components/Employee/TableAndContents/Content/projectsTableContent';
import ProjectManagerProjectsContent from '../TableAndContents/Content/PMprojectsTableContent';
import Button from 'Components/Shared/Button';
const Projects = () => {
  const dispatch = useDispatch();
  const [toggleTable, setToggleTable] = useState(true);
  useEffect(() => {
    dispatch(getProjects());
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
    if (project.pm === employeeLogged?._id) {
      return [
        ...acc,
        {
          projectName: project.name,
          projectId: project._id,
          status: project.active ? 'Active' : 'Inactive',
          client: project.client,
          description: project.description
        }
      ];
    }
    return acc;
  }, []);

  // const projectManagerProjects = projects.reduce((acc, project) => {
  //   const assignedPMProjects = projects.find((project) => {
  //     return project.pm === employeeLogged?._id;
  //   });
  //   console.log('assigned', assignedPMProjects);
  //   if (assignedPMProjects && Object.keys(assignedPMProjects).length) {
  //     return [
  //       {
  //         projectName: project.name,
  //         projectId: project._id,
  //         status: project.active ? 'Active' : 'Inactive',
  //         client: project.client,
  //         description: project.description,
  //         role: assignedPMProjects.members.map((member) => {
  //           return member.role;
  //         }),
  //         rate: assignedPMProjects.members.map((member) => {
  //           return member.rate;
  //         })
  //       }
  //     ];
  //   }
  //   return acc;
  // }, []);

  return (
    <section className={styles.container}>
      <Button
        label={toggleTable ? 'Change to PM' : 'Change to Employee'}
        onClick={() => setToggleTable(!toggleTable)}
      />
      {toggleTable && (
        <span>
          <h2>Employees Table</h2>
          <EmployeeTable
            headersName={['Project', 'Role', 'Rate', 'Status', 'Client', 'Description']}
          >
            <ProjectsTableContent
              data={employeeProjects}
              headers={['projectName', 'role', 'rate', 'status', 'client', 'description']}
            />
          </EmployeeTable>
        </span>
      )}

      {!toggleTable && (
        <span>
          <h2>Project Manager Table</h2>
          <EmployeeTable headersName={['Project', 'Status', 'Client', 'Description']}>
            <ProjectManagerProjectsContent
              data={projectManagerProjects}
              headers={['projectName', 'status', 'client', 'description']}
            />
          </EmployeeTable>
        </span>
      )}
    </section>
  );
};

export default Projects;
