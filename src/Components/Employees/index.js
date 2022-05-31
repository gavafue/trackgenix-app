import EmployeesTable from './EmployeesTable';
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
    } catch (error) {
      console.error(error);
    }
  }, []);
  const changeVisibilityDeleteModal = (property) => {
    document.getElementById('id01').style.display = property;
  };

  const deleteEmployee = (string, setContentFeedbackModal) => {
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/employees/${string}`
    };
    fetch(options.url, options).then(async (response) => {
      const res = await response.json();
      if (response.error === true) {
        setContentFeedbackModal({ title: 'Something went wrong', description: res.message });
      } else {
        setContentFeedbackModal({ title: 'Request done!', description: res.message });
        saveEmployees(employees.filter((employee) => string !== employee._id));
        changeVisibilityDeleteModal('none');
      }
    });
  };

  return (
    <section className={styles.container}>
      <h2>Employees</h2>
      <a href="/employees/form" className={styles.button}>
        Add new employee +
      </a>
      <EmployeesTable
        employees={employees}
        deleteEmployee={deleteEmployee}
        changeVisibilityDeleteModal={changeVisibilityDeleteModal}
      />
    </section>
  );
}

export default Employees;
