import Button from 'Components/Shared/Button';
import React from 'react';
import styles from '../../../Shared/Table/TableContent/tableContent.module.css';

const ProjectsTableContent = ({ headers, data, setInfoToShow, setShowModal }) => {
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
                label="Show More"
                theme="secondary"
                onClick={() => {
                  setShowModal(true);
                  setInfoToShow(row._id);
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
