import { useState } from 'react';
import styles from '../admins.module.css';
import Button from '../../Shared/Button';

const AdminsTable = ({
  admins,

}) => {
  const OnClickEdit = (string) => {
    window.location = `/admins/form?adminId=${string}`;
  };
  const [setInfoForDelete] = useState({
    id: ''
  });
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
                <td>{<Button text="Edit" onClick={() => OnClickEdit(admin._id)} />}</td>
                <td>
                  {
                    <Button
                      isDisabled={true}
                      className={styles.buttonEdit}
                      text="Delete"
                      onClick={() => {
                        setInfoForDelete({
                          id: admin._id
                        });
                      }}
                    />
                  }
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </section>
  );
};

export default AdminsTable;
