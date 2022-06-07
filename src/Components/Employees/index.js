import { useEffect, useState } from 'react';
//import { useParams } from 'react-router-dom';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
// import { useParams } from 'react-router-dom';

const URL = process.env.REACT_APP_API_URL;
// const paramEmployeeId = useParams();
const editData = (id) => {
  window.location = `/employees/form/${id}`;
};

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        saveEmployees(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteEmployee = (_id) => {
    const options = {
      method: 'DELETE',
      url: `${URL}/employees/${_id}`
    };
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          setInfoForFeedback({
            title: 'Something went wrong',
            description: response.message
          });
          setShowFeedbackMessage(true);
        } else {
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          });
          saveEmployees(employees.filter((employee) => _id !== employee._id));
          setShowFeedbackMessage(true);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section className={styles.container}>
      <h2 className={styles.title}>Employees</h2>
      <div className={styles.button}>
        <Button
          type="button"
          label="Add new employee"
          theme="secondary"
          onClick={() => (window.location = `/employees/form`)}
        />
      </div>
      <div>
        <Table
          data={employees}
          headersName={['Name', 'Last Name', 'Email', 'Phone']}
          headers={['firstName', 'lastName', 'email', 'phone']}
          deleteEmployee={deleteEmployee}
          editData={editData}
          setShowModal={setShowDeleteMessage}
          setInfoForDelete={setInfoForDelete}
        />
        <Modal
          isOpen={showDeleteMessage}
          handleClose={() => {
            setShowDeleteMessage(false);
          }}
        >
          <DeleteMessage
            handleClose={() => {
              setShowDeleteMessage(false);
            }}
            infoForDelete={infoForDelete}
            deleteItem={deleteEmployee}
            setShowModal={setShowDeleteMessage}
          />
        </Modal>
        <Modal
          isOpen={showFeedbackMessage}
          handleClose={() => {
            setShowFeedbackMessage(false);
          }}
        >
          <FeedbackMessage infoForFeedback={infoForFeedback} />
        </Modal>
      </div>
    </section>
  );
}

export default Employees;
