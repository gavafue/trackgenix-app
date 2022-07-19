import React from 'react';
import styles from 'Components/Shared/Table/TableContent/tableContent.module.css';

const ProjectsTableContent = ({ headers, data }) => {
  return (
    <tbody className={styles.container}>
      {data.map((row) => {
        return (
          <tr key={row._id} id={row._id} className={styles.rows}>
            {headers.map((header, index) => {
              return (
                <td key={index} className={styles.cell}>
                  {row[header]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProjectsTableContent;
