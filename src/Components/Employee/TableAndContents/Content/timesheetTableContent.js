import React from 'react';
import styles from '../../../Shared/Table/TableContent/tableContent.module.css';
import Button from '../../../Shared/Button';

const ProjectsTableContent = ({ headers, data, setShowModal }) => {
  return (
    <tbody>
      {data.map((row) => {
        return (
          <tr key={row._id} id={row._id}>
            {headers.map((header, index) => {
              return (
                <td key={index} className={styles.rows}>
                  {row[header]}
                </td>
              );
            })}
            <td className={styles.rows}>
              <Button
                label="Add hours +"
                theme="secondary"
                onClick={() => {
                  setShowModal(true);
                }}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProjectsTableContent;
