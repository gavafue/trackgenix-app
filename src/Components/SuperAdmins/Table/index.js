import { useState, useEffect } from 'react';
import styles from './table.module.css';
// import DeleteModal from '../DeleteModal';

const SuperAdminsTable = () => {
  const URL = `${process.env.REACT_APP_API_URL}/super-admin`;
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

  const editSuperAdmin = (_id) => {
    window.location = `/super-admins/form?superadminId=${_id}`;
  };

  //   const changeDisplayModal = (property) => {
  //     document.getElementById('id01').style.display = property;
  //   };

  //   const [infoForDelete, setInfoToDelete] = useState({
  //     id: ''
  //   });

  // const changeVisibilityDeleteModal = (property) => {
  //   document.getElementById('id01').style.display = property;
  // };

  const deleteSuperAdmin = (_id) => {
    fetch(`${process.env.REACT_APP_API_URL}/super-admin/${_id}`, {
      method: 'DELETE'
    }).then((result) => {
      result.json().then((response) => {
        //   if (response.error === true) {
        //     setContentFeedbackModal({ title: 'Something went wrong', description: response.message });
        //   } else {
        //     setContentFeedbackModal({ title: 'Request done!', description: response.message });
        setSuperAdmins(superAdmins.filter((superAdmin) => superAdmin._id !== _id));
        //     changeVisibilityDeleteModal('none');
        alert(response.message);
        //   }
      });
    });
  };

  return (
    <table className={styles.table}>
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
                <button onClick={() => editSuperAdmin(superAdmin._id)}>Edit</button>
              </td>
              <td>
                <button onClick={() => deleteSuperAdmin(superAdmin._id)}>Delete</button>
              </td>
            </tr>
          );
        })}
      </tbody>
      {/* <DeleteModal
        deleteTimesheet={props.deleteSuperAdmin}
        modalId={infoForDelete.id}
        changeVisibilityDeleteModal={props.changeVisibilityDeleteModal}
      /> */}
    </table>
  );
};

export default SuperAdminsTable;
