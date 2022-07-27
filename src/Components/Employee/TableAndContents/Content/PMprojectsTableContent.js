import React from 'react';
import styles from 'Components/Shared/Table/TableContent/tableContent.module.css';
import Button from 'Components/Shared/Button';
import { getSelectedProject } from 'redux/projects/actions';
import { useDispatch } from 'react-redux';
import { useHistory } from 'react-router-dom';
const ProjectManagerProjectsContent = ({ headers, data }) => {
  const history = useHistory();
  const dispatch = useDispatch();
  const editData = (row) => {
    dispatch(getSelectedProject(row));
    history.push(`/employee/projects/edit`);
  };
  return (
    <tbody className={styles.container}>
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
            <td className={styles.cell}>
              <Button label="Edit" onClick={() => editData(row)} />
            </td>
          </tr>
        );
      })}
    </tbody>
  );
};

export default ProjectManagerProjectsContent;
