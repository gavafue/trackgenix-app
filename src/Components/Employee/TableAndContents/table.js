import React from 'react';
import styles from './table.module.css';

const EmployeeTable = ({ children, headersName }) => {
  return (
    <table className={styles.container}>
      <thead className={styles.headers}>
        <tr>
          {headersName.map((headerName, index) => {
            return <th key={index}>{headerName}</th>;
          })}
          <th></th>
          <th></th>
        </tr>
      </thead>
      {children}
    </table>
  );
};

export default EmployeeTable;

