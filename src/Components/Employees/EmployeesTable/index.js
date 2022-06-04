import { useState } from 'react';
import styles from './employeestable.module.css';
import DeleteModal from '../DeleteModal';

const EmployeesTable = (props) => {
  const editEmployee = (string) => {
    window.location = `/employees/form?employeeId=${string}`;
  };
  const [infoForDelete, setInfoToDelete] = useState({
    id: '',
    name: '',
    lastname: ''
  });
  const [showFeedbackModal, setShowFeedbackModal] = useState(false);
  const [showDeleteModal, setShowDeleteModal] = useState(false);
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
                    setShowDeleteModal(true);
                  }}
                >
                  X
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      {showDeleteModal && (
        <DeleteModal
          setShowDeleteModal={setShowDeleteModal}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
          showDeleteModal={showDeleteModal}
          modalId={infoForDelete.id}
          namecomplete={`${infoForDelete.name} ${infoForDelete.lastname}`}
          deleteEmployee={props.deleteEmployee}
        />
      )}
    </table>
  );
};

export default EmployeesTable;
