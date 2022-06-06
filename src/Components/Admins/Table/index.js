import React, { useState } from 'react';
import styles from '../admins.module.css';
import Button from '../../Shared/Button';
import Modal from '../../Shared/Modal';

const AdminsTable = ({ admins }) => {
  const OnClickEdit = (string) => {
    window.location = `/admins/form?adminId=${string}`;
  };
  const [isDeleting, setIsDeleting] = useState(false);
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
                  <Button label="Edit" onClick={() => OnClickEdit(admin._id)} />
                </td>
                <td>
                  <Button
                    label="Delete"
                    onClick={() => {
                      setIsDeleting(true);
                    }}
                  />
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <Modal
        isOpen={isDeleting}
        handleClose={() => {
          setIsDeleting(false);
        }}
      >
        <p>A proper pseudo title for this modal</p>
      </Modal>
    </section>
  );
};

export default AdminsTable;
