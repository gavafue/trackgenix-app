import { useEffect, useState } from 'react';
import styles from './admins.module.css';

function Admins() {
  const [admins, saveAdmins] = useState([]);
  const URL = `${process.env.REACT_APP_API_URL}/admins`;
  useEffect(async () => {
    try {
      const response = await fetch(URL);
      const data = await response.json();
      saveAdmins(data.data);
      console.log(data.data);
    } catch (error) {
      console.error(error);
    }
  }, []);

  const OnClickEdit = (string) => {
    window.location = `/admins/form?adminId=${string}`;
  };

  const OnClickDelete = (string) => {
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/admins/${string}`
    };
    fetch(options.url, options).then(async (response) => {
      await response.json();
      if (response.error === false) {
        return response.json();
      }
    });
    setTimeout(() => {
      window.location.reload();
    }, 2000);
  };

  return (
    <section className={styles.container}>
      <h2>Admins</h2>
      <table>
        <thead>
          <tr>
            <th id="name">Name</th>
            <th id="lastName">Last Name</th>
            <th id="phone">Phone</th>
            <th id="e-mail">E-mail</th>
            <th id="status">Active</th>
            <th id="moreInfo">Show more</th>
            <th id="edit">Edit</th>
            <th id="delete">Delete</th>
          </tr>
        </thead>
        <tbody>
          {admins.map((admin) => {
            return (
              <tr key={admin._id}>
                <td>{admin.name}</td>
                <td>{admin.lastName}</td>
                <td>{admin.phone}</td>
                <td>{admin.email}</td>
                <td>{JSON.stringify(admin.active)}</td>
                <td>
                  <input type="button" value="..." />
                </td>
                <td>
                  <input type="button" value="Edit" onClick={() => OnClickEdit(admin._id)} />
                </td>
                <td>
                  <input type="button" value="Delete" onClick={() => OnClickDelete(admin._id)} />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <input
        type="button"
        value="Add Admin"
        onClick={() => (window.location.href = '/admins/form')}
      />
    </section>
  );
}

export default Admins;
