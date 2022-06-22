import React from 'react';
import styles from '../../../Shared/Table/TableContent/tableContent.module.css';
import Button from '../../../Shared/Button';
import { useDispatch } from 'react-redux';
import { selectOneTimesheet } from 'redux/timesheet/actions';

const TimesheetTableContent = ({ headers, data, setShowForm }) => {
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
              <Button
                label="Add hours +"
                theme="secondary"
                onClick={() => {
                  dispatch(selectOneTimesheet(row));
                  setShowForm(true);
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
