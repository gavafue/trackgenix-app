import { useEffect, useState } from 'react';
import styles from './employees.module.css';

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
                  <button>edit</button>
                </td>
                <td>
                  <button>X</button>
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
