import React from 'react';
import styles from './tableContent.module.css';
import Button from 'Components/Shared/Button';
import { useDispatch } from 'react-redux';
const TableContent = ({
  getSelected,
  headers,
  data,
  editData,
  setShowModal,
  setidFromRow,
  lowLogic
}) => {
  const dispatch = useDispatch();
  return (
    <tbody className={styles.container}>
      {data.map((row) => {
        if (row)
          return (
            <tr key={row._id} id={row._id} className={styles.rows}>
              {headers.map((header, index) => {
                return (
                  <td key={index} className={styles.cell}>
                    {row[header]}
                  </td>
                );
              })}
              {(editData || setidFromRow) && (
                <td className={styles.cell}>
                  {editData && <Button onClick={() => editData(row)} label="Edit" />}
                  {setidFromRow && (
                    <Button
                      label={`${lowLogic ? 'Change status' : 'Delete'}`}
                      theme="secondary"
                      onClick={() => {
                        setShowModal(true);
                        setidFromRow(row._id);
                        {
                          getSelected && dispatch(getSelected(row));
                        }
                      }}
                    />
                  )}
                </td>
              )}
            </tr>
          );
      })}
    </tbody>
  );
};

export default TableContent;
