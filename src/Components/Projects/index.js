import { useEffect, useState } from 'react';
import Table from '../Shared/Table/index';
const Projects = () => {
  const [projects, setProjects] = useState([]);
  const URL = `${process.env.REACT_APP_API_URL}`;

  useEffect(() => {
    fetch(`${URL}/projects`)
      .then((res) => res.json())
      .then((data) => {
        setProjects(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const ProjectData = projects.map((project) => {
    return {
      name: project.name,
      description: project.description,
      client: project.client,
      startDate: project.startDate,
      endDate: project.endDate,
      active: project.active ? 'Yes' : 'No'
    };
  });

  return (
    <section /*className={styles.container}*/>
      <div>
        <Table
          data={ProjectData}
          headersName={[
            'Project',
            'Active',
            'Description',
            'Client',
            'Start Date',
            'End Date',
            'Members'
          ]}
          headers={['name', 'active', 'description', 'client', 'startDate', 'endDate']}
        />
      </div>
      <button /*className={styles.addBtn}*/>
        <a href="/projects/form">Add a Project</a>
      </button>
    </section>
  );
};

export default Projects;
