import { useState } from 'react';
import DeleteModal from '../DeleteModal';

const SuperAdminsTable = ({
  setShowFeedbackModal,
  showFeedbackModal,
  superAdmins,
  deleteSuperAdmin,
  showModal,
  setShowModal
}) => {
  const editSuperAdmin = (string) => {
    window.location = `/super-admins/form?superadminId=${string}`;
  };

  const [InfoForDelete, setInfoForDelete] = useState({
    id: ''
  });
  return (
    <table>
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
                <button
                  onClick={() => {
                    editSuperAdmin(superAdmin._id);
                  }}
                >
                  Edit
                </button>
              </td>
              <td>
                <button
                  onClick={() => {
                    setShowModal(!showModal);
                    setInfoForDelete({
                      id: superAdmin._id
                    });
                  }}
                >
                  Delete
                </button>
              </td>
            </tr>
          );
        })}
      </tbody>
      {showModal && (
        <DeleteModal
          setShowModal={setShowModal}
          showFeedbackModal={showFeedbackModal}
          setShowFeedbackModal={setShowFeedbackModal}
          modalId={InfoForDelete.id}
          deleteSuperAdmin={deleteSuperAdmin}
          setInfoFoDelete={setInfoForDelete}
          showModal={showModal}
        />
      )}
    </table>
  );
};

export default SuperAdminsTable;
