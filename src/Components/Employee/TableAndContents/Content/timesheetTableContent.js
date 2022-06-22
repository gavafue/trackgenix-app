import React from 'react';
import styles from '../../../Shared/Table/TableContent/tableContent.module.css';

const TimesheetTableContent = ({ headers, timesheetData }) => {
  return (
    <tbody>
      {timesheetData.map((row) => {
        return (
          <tr key={row._id} id={row._id}>
            {headers.map((header, index) => {
              return (
                <td key={index} className={styles.rows}>
                  {row[header]}
                </td>
              );
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default TimesheetTableContent;
