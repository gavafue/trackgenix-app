import React from 'react';
import styles from './tableContent.module.css';
import Button from '../../Button';

const TableContent = ({ headers, data, editData, setShowModal, setInfoForDelete }) => {
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
            <td>
              <Button onClick={() => editData(row._id)} label="Edit" />
            </td>
            <td>
              <Button
                label="Delete"
                theme="secondary"
                onClick={() => {
                  setShowModal(true);
                  setInfoForDelete(row._id);
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
