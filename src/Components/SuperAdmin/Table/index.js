import React from 'react';
import { getSelectedAdmin } from 'redux/admins/actions';
import Button from 'Components/Shared/Button';
import styles from 'Components/SuperAdmin/Table/table.module.css';
import { useDispatch } from 'react-redux';

const AdminsTable = ({ headersName, setShowModal, headers, data }) => {
  const dispatch = useDispatch();
  return (
    <table className={styles.container}>
      <thead className={styles.headers}>
        <tr>
          {headersName.map((headerName, index) => {
            return <th key={index}>{headerName}</th>;
          })}
          <th></th>
        </tr>
      </thead>
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
                  label="x"
                  theme="secondary"
                  onClick={() => {
                    dispatch(getSelectedAdmin(row));
                    // resetFormAddHours({
                    //   timesheetId: row._id,
                    //   timesheetName: row.project?.name,
                    //   hoursWorked: row.hoursWorked
                    // });
                    setShowModal(true);
                  }}
                />
              </td>
            </tr>
          );
        })}
      </tbody>
    </table>
  );
};

export default AdminsTable;
