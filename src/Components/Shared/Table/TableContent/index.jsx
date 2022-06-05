import React from 'react';
import styles from './tableContent.module.css';

const TableContent = ({ headers, data, editData }) => {
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
              <button onClick={() => editData(row._id)}>edit</button>
            </td>
            <td>
              <button />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default TableContent;
