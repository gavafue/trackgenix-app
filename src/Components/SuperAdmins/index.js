import { useEffect, useState } from 'react';
import styles from './super-admins.module.css';
import Form from './form/form.js';

const URL = `${process.env.REACT_APP_API_URL}/super-admin`;

const SuperAdmins = () => {
  const [superAdmins, setSuperAdmins] = useState([]);
  console.log(superAdmins);
  useEffect(async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      setSuperAdmins(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const onClickForm = () => {
    window.location.href = '/super-admin/form';
  };

  const deleteSuperAdmin = (_id) => {
    // if (modal);
    fetch(`${process.env.REACT_APP_API_URL}/super-admin/${_id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((response) => {
        setSuperAdmins([...superAdmins.filter((superAdmin) => superAdmin._id !== _id)]);
        alert(response.message);
      });
    });
  };

  return (
    <section className={styles.container}>
      <Form />
      <table className={styles}>
        <thead>
          <tr>
            <th>Name</th>
            <th>Lastname</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {superAdmins.map((superAdmin) => {
            return (
              <tr key={superAdmin._id}>
                <td>{superAdmin.firstName}</td>
                <td>{superAdmin.lastName}</td>
                <td>{superAdmin.active ? 'Active' : 'Inactive'}</td>
                <td>
                  <button onClick={onClickForm}>Edit</button>
                </td>
                <td>
                  <button onClick={() => deleteSuperAdmin(superAdmin._id)}>Delete</button>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={onClickForm}>Create</button>
    </section>
  );
};

export default SuperAdmins;
