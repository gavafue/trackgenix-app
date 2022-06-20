import styles from './projects.module.css';
import React from 'react';
import EmployeeTable from '../TableAndContents/table';

function Projects() {
  return (
    <section className={styles.container}>
      <h2>Your Projects</h2>
      <div>
        <EmployeeTable headersName={['Project', 'Role', 'Hours']}>
          <projectsTableContent />
        </EmployeeTable>
      </div>
    </section>
  );
}

export default Projects;
