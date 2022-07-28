import React from 'react';
import styles from 'Components/Shared/Table/TableContent/tableContent.module.css';
import Button from 'Components/Shared/Button';
import { useDispatch } from 'react-redux';
import { getSelectedProject } from 'redux/projects/actions';
import { useHistory } from 'react-router-dom';

const TimesheetTableContent = ({ headers, data }) => {
  const dispatch = useDispatch();
  const history = useHistory();
  const moveToAddTimesheet = () => {
    history.push('/employee/timesheet/addNewTimesheet');
  };
  return (
    <tbody>
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
            <td className={styles.rows}>
              <Button
                label="Add timesheet +"
                theme="secondary"
                onClick={() => {
                  dispatch(getSelectedProject(row));
                  moveToAddTimesheet();
                }}
              />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TimesheetTableContent;
