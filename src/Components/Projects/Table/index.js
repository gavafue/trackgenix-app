import { useEffect, useState } from 'react';
import styles from './projects.module.css';

const ProjectsTable = () => {
  const [projects, setProjects] = useState([]);
  const URL = `${process.env.REACT_APP_API_URL}/projects`;
  const editProject = (string) => {
    window.location = `/projects/form?projectId=${string}`;
  };
  useEffect(async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setProjects(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onClickForm = () => {
    window.location.href = '/projects/form';
  };

  const deleteProject = (_id) => {
    fetch(`${URL}/${_id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((response) => {
        setProjects(projects.filter((project) => project._id !== _id));
        alert(response.message);
      });
    });
  };

  return (
    <section className={styles.container}>
      <h2>Projects</h2>
      <table className={styles.table}>
        <thead>
          <tr>
            <th>Project</th>
            <th>State</th>
            <th>Description</th>
            <th>Client</th>
            <th>Start Date</th>
            <th>End Date</th>
            <th>Members</th>
            <th>Admin tools</th>
          </tr>
        </thead>
        <tbody>
          {projects &&
            projects.map((project) => {
              return (
                <tr key={project._id}>
                  <td>{project.name}</td>
                  <td>{project.active ? 'Active' : 'Inactive'}</td>
                  <td>{project.description}</td>
                  <td>{project.client}</td>
                  <td>{project.startDate}</td>
                  <td>{project.endDate}</td>
                  <td>{project.members[0].rate}</td>
                  <td>
                    <button className={styles.smallBtn} onClick={() => editProject(project._id)}>
                      Edit
                    </button>
                    <button className={styles.smallBtn} onClick={() => deleteProject(project._id)}>
                      Delete
                    </button>
                  </td>
                </tr>
              );
            })}
        </tbody>
      </table>
      <button onClick={onClickForm} className={styles.smallBtn}>
        Add Project
      </button>
    </section>
  );
};

export default ProjectsTable;
