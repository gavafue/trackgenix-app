import { useEffect, useState } from 'react';
import styles from './employees.module.css';
const editEmployee = (string) => {
  window.location = `/employees/form?employeeId=${string}`;
};
const deleteEmployee = (string) => {
  const options = {
    method: 'DELETE',
    url: `${process.env.REACT_APP_API_URL}/employees/${string}`
  };
  fetch(options.url, options).then(async (response) => {
    const res = await response.json();
    alert(res.message);
  });
  window.location.reload;
};

function Employees() {
  const [employees, saveEmployees] = useState([]);

  useEffect(async () => {
    try {
      const URL = process.env.REACT_APP_API_URL;
      const response = await fetch(`${URL}/employees`);
      const data = await response.json();
      saveEmployees(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <a href="/employees/form" className={styles.button}>
        Add new employee +
      </a>
      <table className={styles.redTable}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Last Name</th>
            <th>Email</th>
            <th>Active</th>
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
                <td>{JSON.stringify(employee.active)}</td>
                <td>
                  <button onClick={() => editEmployee(employee._id)}>edit</button>
                </td>
                <td>
                  <button onClick={() => deleteEmployee(employee._id)}>X</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
}

export default Employees;
