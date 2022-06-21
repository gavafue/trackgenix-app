import React from 'react';
import styles from '../../../Shared/Table/TableContent/tableContent.module.css';
import Button from '../../../Shared/Button';
import Input from 'Components/Shared/Input/InputText';

const ProjectsTableContent = ({ headers, data, setShowModal, setInfoToShow }) => {
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
              <Input label="Add Hours" theme="secondary" />
            </td>
            <td className={styles.rows}>
              <Button
                label="+"
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
