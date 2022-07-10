import React from 'react';
import styles from './tableContent.module.css';
import Button from '../../Button';
import { getSelectedAdmin } from 'redux/admins/actions';
import { useDispatch } from 'react-redux';

const TableContent = ({ headers, data, editData, setShowModal, setInfoForDelete }) => {
  const dispatch = useDispatch();
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
                label="Delete"
                theme="secondary"
                onClick={() => {
                  setShowModal(true);
                  setInfoForDelete(row._id);
                  dispatch(getSelectedAdmin(row));
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
