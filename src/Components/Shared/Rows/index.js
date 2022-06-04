import React from 'react';

const Rows = ({ data, headers }) => {
  return (
    <tbody>
      {data.map((row) => {
        return (
          <tr key={row.id}>
            {headers.map((header, index) => {
              return <td key={index}>{row[header]}</td>;
            })}
          </tr>
        );
      })}
    </tbody>
  );
};

export default Rows;
