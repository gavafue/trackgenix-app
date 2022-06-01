import { useEffect, useState } from 'react';
import styles from '../admins.module.css';
import DeleteModal from '../DeleteModal';

const AdminsTable = (props) => {
  const changeDisplayModal = (property) => {
    document.getElementById('id01').style.display = property;
  };
  const [infoForDelete, setInfoToDelete] = useState({
    id: ''
  });

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
                  <button
                    className="buttonEdit"
                    type="button"
                    value="Edit"
                    onClick={() => OnClickEdit(admin._id)}
                  >
                    Edit
                  </button>
                </td>
                <td>
                  <button
                    onClick={() => {
                      setInfoToDelete({
                        id: admin._id
                      });
                      changeDisplayModal('flex');
                    }}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            );
          })}
        </tbody>
        <DeleteModal
          deleteTimesheet={props.deleteTimesheet}
          modalId={infoForDelete.id}
          changeVisibilityDeleteModal={props.changeVisibilityDeleteModal}
        />
      </table>
      <input
        type="button"
        value="Add Admin"
        onClick={() => (window.location.href = '/admins/form')}
      />
    </section>
  );
};

export default AdminsTable;
