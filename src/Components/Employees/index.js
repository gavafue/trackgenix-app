import { useEffect, useState } from 'react';
import styles from './employees.module.css';
import Table from '../Shared/Table';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
const URL = process.env.REACT_APP_API_URL;

const editData = (string) => {
  window.location = `/employees/form?employeeId=${string}`;
};

function Employees() {
  const [employees, saveEmployees] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  // console.log(infoForFeedback);
  // console.log(infoForDelete);
  useEffect(() => {
    fetch(`${URL}/employees`)
      .then((res) => res.json())
      .then((data) => {
        saveEmployees(data.data);
      })
      .catch((error) => console.log(error));
  }, []);

  const deleteEmployee = (string) => {
    const options = {
      method: 'DELETE',
      url: `${URL}/employees/${string}`
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
          saveEmployees(employees.filter((employee) => string !== employee._id));
          setShowFeedbackMessage(true);
        }
      })
      .catch((error) => console.log(error));
  };
  return (
    <section>
      <h2>Employees</h2>
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
      <a href="/employees/form" className={styles.button}>
        Add new employee
      </a>
    </section>
  );
}

export default Employees;
