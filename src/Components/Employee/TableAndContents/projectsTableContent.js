import React from 'react';
import styles from '../../Shared/Table/TableContent/tableContent.module.css';
import Button from '../../Shared/Button';

const projectsTableContent = ({ headers, data, editData, setShowModal, setInfoToShow }) => {
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
              <Button onClick={() => editData(row)} label="Edit" />
            </td>
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

export default projectsTableContent;
