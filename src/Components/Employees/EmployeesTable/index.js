import { useEffect, useState } from 'react';
import styles from '../employees.module.css';
import DeleteModal from '../DeleteModal';

const EmployeesTable = () => {
  const editEmployee = (string) => {
    window.location = `/employees/form?employeeId=${string}`;
  };
  const changeDisplayModal = (property) => {
    document.getElementById('id01').style.display = property;
  };
  const [employees, saveEmployees] = useState([]);
  const [infoForDelete, setInfoToDelete] = useState({
    id: '',
    name: '',
    lastname: ''
  });

  useEffect(async () => {
    try {
      const URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${URL}/employees`);
      const data = await response.json();
      saveEmployees(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

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
        {employees.map((employee) => {
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
      />
    </table>
  );
};

export default EmployeesTable;
