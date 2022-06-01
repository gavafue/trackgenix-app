import { useEffect, useState } from 'react';
import styles from './projects.module.css';
// import DeleteModal from '../DeleteModal';

const ProjectsTable = (/*props*/) => {
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

  // const changeVisibilityDeleteModal = (property) => {
  //   document.getElementById('id01').style.display = property;
  // };

  const deleteProject = (_id /*, setContentFeedbackModal*/) => {
    fetch(`${URL}/${_id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((response) => {
        setProjects(projects.filter((project) => project._id !== _id));
        alert(response.message);
        // setContentFeedbackModal({ title: 'Request done!', description: response.message });
        // changeVisibilityDeleteModal('none');
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
                  <td>{project.members[0]._id}</td>
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
      <button onClick={onClickForm} className={styles.submitBtn}>
        Add Project
      </button>
      {/* <DeleteModal
        deleteProject={props.deleteProject}
        modalId={projects._id}
        changeVisibilityDeleteModal={props.changeVisibilityDeleteModal}
      /> */}
    </section>
  );
};

export default ProjectsTable;
