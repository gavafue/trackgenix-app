import { useState, useEffect } from 'react';
import styles from './select.module.css';
const Select = () => {
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
  return (
    <div>
      <select className={styles.formSelect}>
        {employees.map((employee) => {
          return (
            <option
              key={employee._id}
              value={employee._id}
            >{`${employee.firstName} ${employee.lastName}`}</option>
          );
        })}
        ;
      </select>
    </div>
  );
};

export default Select;
