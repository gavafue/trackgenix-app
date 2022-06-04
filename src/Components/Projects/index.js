import styles from './projects.module.css';
import ProjectsTable from './Table';
import { useEffect, useState } from 'react';

const Projects = () => {
  const [projects, setProjects] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const URL = `${process.env.REACT_APP_API_URL}/projects`;
  useEffect(() => {
    fetch(URL)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => console.log(err));
  }, []);

  const deleteProject = (string, setContentFeedbackModal) => {
    const options = {
      method: 'DELETE',
      url: `${URL}/${string}`
    };
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          // setShowModal(false);
          setContentFeedbackModal({ title: 'Something went wrong', description: response.message });
        } else {
          // setShowModal(false);
          setContentFeedbackModal({ title: 'Request done!', description: response.message });
          setProjects(projects.filter((project) => project._id !== string));
        }
      })
      .catch((err) => console.log(err));
  };

  return (
    <section className={styles.container}>
      <ProjectsTable
        projects={projects}
        deleteProject={deleteProject}
        showModal={showModal}
        setShowModal={setShowModal}
      />
      <button className={styles.addBtn}>
        <a href="/projects/form">Add a Project</a>
      </button>
    </section>
  );
};

export default Projects;
