import React from 'react';
import styles from 'Components/Shared/Table/TableContent/tableContent.module.css';
import Button from 'Components/Shared/Button';
const ProjectManagerProjectsContent = ({ headers, data }) => {
  return (
    <tbody className={styles.container}>
      {data.map((row) => {
        return (
          <tr key={row._id} id={row._id} className={styles.rows}>
            {headers.map((header, index) => {
              return <td key={index}>{row[header]}</td>;
            })}
            <td>
              <Button label="Edit" />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProjectManagerProjectsContent;
