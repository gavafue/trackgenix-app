import React from 'react';
import styles from './tableContent.module.css';
import Button from 'Components/Shared/Button';

const TableContent = ({ headers, data, editData, setShowModal, setidFromRow }) => {
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
            <td className={styles.cell}>
              <Button onClick={() => editData(row)} label="Edit" />
              <Button
                label="Delete"
                theme="secondary"
                onClick={() => {
                  setShowModal(true);
                  setidFromRow(row._id);
                }}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableContent;
