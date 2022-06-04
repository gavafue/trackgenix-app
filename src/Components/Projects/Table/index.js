import { useState } from 'react';
import styles from './projects.module.css';
import DeleteModal from '../DeleteModal';

const ProjectsTable = ({
  setShowFeedbackModal,
  showFeedbackModal,
  projects,
  deleteProject,
  showModal,
  setShowModal
}) => {
  const editProject = (string) => {
    window.location = `/projects/form?projectId=${string}`;
  };
  const [infoForDelete, setInfoForDelete] = useState({
    id: ''
  });

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
          {projects.map((project) => {
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
                  <button onClick={() => editProject(project._id)}>edit</button>
                  <button
                    onClick={() => {
                      setShowModal(!showModal);
                      setInfoForDelete({
                        id: project._id
                      });
                    }}
                  >
                    delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        {showModal && (
          <DeleteModal
            deleteProject={deleteProject}
            modalId={infoForDelete.id}
            setInfoFoDelete={setInfoForDelete}
            showFeedbackModal={showFeedbackModal}
            setShowFeedbackModal={setShowFeedbackModal}
            showModal={showModal}
            setShowModal={setShowModal}
          />
        )}
      </table>
    </section>
  );
};

export default ProjectsTable;
