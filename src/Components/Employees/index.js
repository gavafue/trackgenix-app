// import EmployeesTable from './EmployeesTable';
import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import { useParams } from 'react-router-dom';

const URL = process.env.REACT_APP_API_URL;

const editData = () => {
  useParams();
};

function Employees() {
  const [employees, saveEmployees] = useState([]);
  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        saveEmployees(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteEmployee = (string, setContentFeedbackModal) => {
    const options = {
      method: 'DELETE',
      url: `${URL}/employees/${string}`
    };
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          setContentFeedbackModal({
            title: 'Something went wrong',
            description: response.message
          });
        } else {
          setContentFeedbackModal({
            title: 'Request done!',
            description: response.message
          });
          saveEmployees(employees.filter((employee) => string !== employee._id));
        }
      })
      .catch((error) => console.log(error));
  };

  return (
    <section>
      <h2>Employees</h2>
      <div>
        <Table
          data={employees}
          headersName={['Name', 'Last Name', 'Email', 'Phone']}
          headers={['firstName', 'lastName', 'email', 'phone']}
          deleteEmployee={deleteEmployee}
          editData={editData}
        />
      </div>
      <a href="/employees/form" className={styles.button}>
        Add new employee
      </a>
    </section>
  );
}

export default Employees;
