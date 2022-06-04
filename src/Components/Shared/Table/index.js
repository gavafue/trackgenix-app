import React from 'react';
import Rows from '../Rows';

const Table = ({ data, headers }) => {
  return (
    <table>
      <thead>
        <tr>
          {headers.map((header, index) => {
            return <th key={index}>{header}</th>;
          })}
        </tr>
      </thead>
      <Rows data={data} headers={headers} />
    </table>
  );
};

export default Table;
