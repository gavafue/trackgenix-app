import { useState } from 'react';
import styles from './employeestable.module.css';
import DeleteModal from '../DeleteModal';

const EmployeesTable = (props) => {
  const editEmployee = (string) => {
    window.location = `/employees/form?employeeId=${string}`;
  };
  const changeDisplayModal = (property) => {
    document.getElementById('id01').style.display = property;
  };

  const [infoForDelete, setInfoToDelete] = useState({
    id: '',
    name: '',
    lastname: ''
  });

  return (
    <table className={styles.redTable}>
      <thead>
        <tr>
          <th>Name</th>
          <th>Last Name</th>
          <th>Email</th>
          <th>Country</th>
          <th>City</th>
          <th>Phone</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {props.employees.map((employee) => {
          return (
            <tr key={employee._id} id={employee._id}>
              <td>{employee.firstName}</td>
              <td>{employee.lastName}</td>
              <td>{employee.email}</td>
              <td>{employee.country}</td>
              <td>{employee.city}</td>
              <td>{employee.phone}</td>
              <td>
                <button className={styles.smallButton} onClick={() => editEmployee(employee._id)}>
                  edit
                </button>
              </td>
              <td>
                <button
                  className={styles.smallButton}
                  onClick={() => {
                    setInfoToDelete({
                      id: employee._id,
                      name: employee.firstName,
                      lastname: employee.lastName
                    });
                    changeDisplayModal('flex');
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      <DeleteModal
        modalId={infoForDelete.id}
        namecomplete={`${infoForDelete.name} ${infoForDelete.lastname}`}
        deleteEmployee={props.deleteEmployee}
        changeVisibilityDeleteModal={props.changeVisibilityDeleteModal}
      />
    </table>
  );
};

export default EmployeesTable;
