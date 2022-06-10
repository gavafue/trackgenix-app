import styles from './tasks.module.css';
import Table from '../Shared/Table';
import { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import DeleteMessage from '../Shared/DeleteMessage';
import Modal from '../Shared/Modal';
import FeedbackMessage from '../Shared/FeedbackMessage';
import Button from '../Shared/Button';
import Preloader from '../Shared/Preloader';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [showDeleteMessage, setShowDeleteMessage] = useState(false);
  const [showFeedbackMessage, setShowFeedbackMessage] = useState(false);
  const [infoForDelete, setInfoForDelete] = useState('');
  const [infoForFeedback, setInfoForFeedback] = useState({});
  const [showPreloader, setShowPreloader] = useState(false);
  const history = useHistory();
  const editData = (id) => {
    history.push(`/tasks/form/${id}`);
  };
  const createTask = () => {
    history.push('/tasks/form/');
  };

  const url = `${process.env.REACT_APP_API_URL}`;
  useEffect(() => {
    setShowPreloader(true);
    fetch(`${url}/tasks`)
      .then((res) => res.json())
      .then((data) => {
        setTasks(data.data);
        setShowPreloader(false);
      })
      .catch((err) => console.log(err));
  }, []);
  const deleteTask = (taskId) => {
    const options = {
      method: 'DELETE',
      url: `${url}/tasks/${taskId}`
    };
    setShowPreloader(true);
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
          setTasks(tasks.filter((task) => taskId !== task._id));
          setShowFeedbackMessage(true);
          setShowPreloader(false);
        }
      })
      .catch((err) => console.log(err));
  };
  const taskData = tasks.map((task) => ({
    ...task,
    nameProject: task.nameProject?.name || 'Project Not Found'
  }));
  return (
    <section className={styles.container}>
      <h2>Tasks</h2>
      <div className={styles.buttonContainer}>
        <Button onClick={createTask} label="Add new task" theme="secondary" />
      </div>
      <Table
        data={taskData}
        headersName={['Project', 'Week', 'Day', 'Description', 'Hours']}
        headers={['nameProject', 'week', 'day', 'description', 'hours']}
        setShowModal={setShowDeleteMessage}
        setInfoForDelete={setInfoForDelete}
        editData={editData}
        deleteTask={deleteTask}
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
      {showPreloader && <Preloader />}
    </section>
  );
};

export default Tasks;
