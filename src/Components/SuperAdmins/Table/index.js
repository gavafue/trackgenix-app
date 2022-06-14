import { useState } from 'react';
import DeleteModal from '../DeleteModal';

const SuperAdminsTable = ({
  setShowFeedbackModal,
  showFeedbackModal,
  superAdmins,
  deleteSuperAdmin,
  showDeleteModal,
  setShowDeleteModal
}) => {
  const editSuperAdmin = (string) => {
    window.location = `/super-admins/form?superadminId=${string}`;
  };

  const [infoForDelete, setInfoForDelete] = useState({
    id: ''
  });
  return (
    <table>
      <thead>
        <th>Name</th>
        <th>Lastname</th>
        <th>Status</th>
        <th></th>
        <th></th>
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
                <button
                  onClick={() => {
                    setInfoForDelete({
                      id: superAdmin._id
                    });
                    setShowDeleteModal(!showDeleteModal);
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      {showDeleteModal && (
        <DeleteModal
          showDeleteModal={showDeleteModal}
          setShowDeleteModal={setShowDeleteModal}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
          modalId={infoForDelete.id}
          deleteSuperAdmin={deleteSuperAdmin}
          setInfoFoDelete={setInfoForDelete}
        />
      )}
    </table>
  );
};

export default SuperAdminsTable;
