import React from 'react';
import styles from './table.module.css';

const EmployeeTable = ({ children, headersName }) => {
  return (
    <section className={styles.container}>
      <table className={styles.table}>
        <thead className={styles.headers}>
          <tr>
            {headersName.map((headerName, index) => {
              return <th key={index}>{headerName}</th>;
            })}
            <th></th>
          </tr>
        </thead>
        {children}
      </table>
    </section>
  );
};

export default EmployeeTable;
