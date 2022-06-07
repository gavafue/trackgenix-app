import styles from './tasks.module.css';
import Table from '../Shared/Table';
import { useEffect, useState } from 'react';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const editData = (id) => {
    window.location = `/tasks/form/${id}`;
  };
  const createTask = () => {
    window.location.href = '/tasks/form/';
  };
  const url = `${process.env.REACT_APP_API_URL}`;
  useEffect(() => {
    fetch(`${url}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.data);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteTask = (string) => {
    const options = {
      method: 'DELETE',
      url: `${process.env.REACT_APP_API_URL}/tasks/${string}`
    };
    fetch(options.url, options)
      .then((response) => response.json())
      .then((response) => {
        if (response.error === true) {
          setInfoForFeedback({
            title: 'Something went wrong',
            description: response.message
          });
        } else {
          setInfoForFeedback({
            title: 'Request done!',
            description: response.message
          });
          setTasks(tasks.filter((task) => task._id !== string));
          setShowFeedbackMessage(true);
        }
      })
      .catch((err) => console.log(err));
  };
  const taskData = tasks.map((task) => {
    return {
      nameProject: JSON.stringify(task.nameProject.name),
      week: task.week,
      day: task.day,
      description: task.description,
      hours: task.hours
    };
  });
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div className={styles.buttonContainer}>
        <Button onClick={createTask} label="Add Task" theme="secondary" />
      </div>
      <Table
        data={taskData}
        headersName={['Project', 'Week', 'Day', 'Description', 'Hours']}
        headers={['nameProject', 'week', 'day', 'description', 'hours']}
        setShowModal={setShowDeleteMessage}
        setInfoForDelete={setInfoForDelete}
        editData={editData}
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
          deleteItem={deleteTask}
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
    </section>
  );
};

export default Tasks;
